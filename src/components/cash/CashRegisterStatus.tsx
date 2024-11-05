import React from 'react';
import { DollarSign, AlertCircle } from 'lucide-react';
import { CashRegister } from '../../types';
import Modal from '../common/Modal';

interface CashRegisterStatusProps {
  cashRegister: CashRegister | null;
  onOpenRegister: (initialAmount: number) => void;
  onCloseRegister: () => void;
}

export default function CashRegisterStatus({
  cashRegister,
  onOpenRegister,
  onCloseRegister,
}: CashRegisterStatusProps) {
  const [showOpenModal, setShowOpenModal] = React.useState(false);
  const [initialAmount, setInitialAmount] = React.useState('');
  const [showCloseModal, setShowCloseModal] = React.useState(false);

  const handleOpenRegister = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenRegister(Number(initialAmount));
    setShowOpenModal(false);
    setInitialAmount('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Estado de Caja</h2>
        <DollarSign className={`w-6 h-6 ${cashRegister?.status === 'open' ? 'text-green-500' : 'text-red-500'}`} />
      </div>

      {cashRegister ? (
        <div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600">Estado</p>
              <p className="text-lg font-medium">
                {cashRegister.status === 'open' ? 'Abierta' : 'Cerrada'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Monto Actual</p>
              <p className="text-lg font-medium">
                ${cashRegister.currentAmount.toLocaleString()}
              </p>
            </div>
          </div>

          {cashRegister.status === 'open' && (
            <button
              onClick={() => setShowCloseModal(true)}
              className="btn btn-primary w-full"
            >
              Cerrar Caja
            </button>
          )}
        </div>
      ) : (
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">La caja está cerrada</p>
          <button
            onClick={() => setShowOpenModal(true)}
            className="btn btn-primary"
          >
            Abrir Caja
          </button>
        </div>
      )}

      {/* Open Register Modal */}
      <Modal
        isOpen={showOpenModal}
        onClose={() => setShowOpenModal(false)}
        title="Abrir Caja"
      >
        <form onSubmit={handleOpenRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monto Inicial
            </label>
            <input
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(e.target.value)}
              className="input"
              placeholder="0.00"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowOpenModal(false)}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Abrir Caja
            </button>
          </div>
        </form>
      </Modal>

      {/* Close Register Modal */}
      <Modal
        isOpen={showCloseModal}
        onClose={() => setShowCloseModal(false)}
        title="Cerrar Caja"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Monto Inicial</p>
              <p className="text-lg font-medium">
                ${cashRegister?.initialAmount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Monto Final</p>
              <p className="text-lg font-medium">
                ${cashRegister?.currentAmount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Transacciones del día</h3>
            <div className="max-h-[300px] overflow-y-auto">
              {cashRegister?.transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(transaction.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <span className={`font-medium ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}
                    ${transaction.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowCloseModal(false)}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onCloseRegister();
                setShowCloseModal(false);
              }}
              className="btn btn-primary"
            >
              Confirmar Cierre
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}