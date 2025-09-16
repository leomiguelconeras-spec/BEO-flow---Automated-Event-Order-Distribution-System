import React, { useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import EventOrderView from '../components/EventOrderView';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import DistributionModal from '../components/DistributionModal';
import { EventStatus } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEvent, deleteEvent, updateEvent } = useEvents();
  const [isDistributing, setIsDistributing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const event = id ? getEvent(id) : undefined;

  const handleExportPDF = () => {
    if (!printRef.current || !event) return;

    setIsExporting(true);

    const input = printRef.current;
    html2canvas(input, { scale: 2, useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;
        
        const imgWidth = pageWidth - (margin * 2);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;
        
        // Add first page
        pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
        heightLeft -= (pageHeight - (margin * 2));

        while (heightLeft > 0) {
          position = position - (pageHeight - (margin * 2));
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
          heightLeft -= (pageHeight - (margin * 2));
        }
        
        pdf.save(`BEO-${event.eventName.replace(/\s+/g, '_')}.pdf`);
        setIsExporting(false);
      })
      .catch(err => {
        console.error("Error exporting PDF:", err);
        alert("An error occurred while exporting the PDF. Please try again.");
        setIsExporting(false);
      });
  };

  if (!event) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Event not found</h2>
        <Link to="/dashboard" className="text-primary hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
        deleteEvent(event.id);
        navigate('/dashboard');
    }
  };

  const handleApprove = () => {
    if (window.confirm('Are you sure you want to approve this BEO? This action cannot be undone.')) {
        updateEvent(event.id, { status: EventStatus.Approved });
    }
  };


  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <Link to="/dashboard" className="text-primary hover:underline flex items-center">
            &larr; Back to Dashboard
        </Link>
        <div className="flex space-x-2">
            {event.status === EventStatus.Draft && (
                 <Button onClick={handleApprove} variant="outline">
                    Approve BEO
                </Button>
            )}
            <Button onClick={() => setIsDistributing(true)}>
                <Icon name="share" className="w-4 h-4 mr-2" />
                Distribute
            </Button>
             <Button onClick={handleExportPDF} disabled={isExporting}>
                <Icon name="download" className="w-4 h-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Export to PDF'}
            </Button>
            <Link to={`/edit/${event.id}`}>
                <Button variant="outline">
                     <Icon name="edit" className="w-4 h-4 mr-2" />
                    Edit
                </Button>
            </Link>
            <Button variant="destructive" onClick={handleDelete}>
                <Icon name="trash" className="w-4 h-4 mr-2" />
                Delete
            </Button>
        </div>
      </div>

      <div ref={printRef}>
        <EventOrderView event={event} />
      </div>

      <DistributionModal 
        isOpen={isDistributing}
        onClose={() => setIsDistributing(false)}
        event={event}
      />
    </div>
  );
};

export default EventDetailPage;