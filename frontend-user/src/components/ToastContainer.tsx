
import React from 'react';

// This component doesn't render anything itself.
// Its purpose is to provide a consistent mounting point for the toast utility,
// even though the utility attaches directly to the document body.
// This makes the structure cleaner and more aligned with React principles.

const ToastContainer: React.FC = () => {
  return <div id="toast-container" className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2"></div>;
};

export default ToastContainer;
