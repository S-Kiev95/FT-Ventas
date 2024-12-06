import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center py-10 text-red-600">
      <p className="text-xl font-semibold">{message}</p>
      <p className="mt-2 text-gray-600">Por favor, intenta nuevamente más tarde</p>
    </div>
  </div>
);