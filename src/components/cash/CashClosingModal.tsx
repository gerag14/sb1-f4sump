import React from 'react';
import { CashRegister, CashTransaction } from '../../types';
import Modal from '../common/Modal';

interface CashClosingModalProps {
  isOpen: boolean;
  onClose: () => void;
  cashRegister: CashRegister;
  onConfirm: (register: CashRegister) => void;
}

export default function CashClosingModal({
  isOpen,
  onClose,
  cashRegister,
  onConfirm
}: CashClosingModalProps) {
  const groupedTransactions = React.useMemo(() => {
    return cashRegister.transactions.reduce((acc, transaction) => {
      const method = transaction.paymentMethod;
      if (!acc[method]) {
        acc[method] = {
          income: 0,
          expense: 0,
          transactions: []
        };
      }
      
      acc[method][transaction.type] += transaction.amount;
      acc[method].transactions.push(transaction);
      
      return acc;
    }, {} as Record<string, {
      income: number;
      expense: number;
      transactions: CashTransaction[];
    }>);
  }, [cashRegister.transactions]);

  const handleConfirm = () => {
    onConfirm({
      ...cashRegister,
      closedAt: new Date().toISOString(),
      status: 'closed'
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cierre de Caja"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Efectivo</p>
            <p className="text-xl font-semibold text-gray-900">
              ${(groupedTransactions.cash?.income || 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Tarjeta</p>
            <p className="text-xl font-semibold text-gray-900">
              ${(groupedTransactions.card?.income || 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Transferencia</p>
            <p className="text-xl font-semibold text-gray-900">
              ${(groupedTransactions.transfer?.income || 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Método
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cashRegister.transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.paymentMethod === 'cash' ? 'Efectivo' :
                     transaction.paymentMethod === 'card' ? 'Tarjeta' : 'Transferencia'}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium
                    ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}
                    ${transaction.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="btn btn-primary"
          >
            Confirmar Cierre
          </button>
        </div>
      </div>
    </Modal>
  );
}