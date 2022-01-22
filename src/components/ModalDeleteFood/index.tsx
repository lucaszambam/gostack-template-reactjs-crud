import { FormHandles } from '@unform/core';
import React, { useCallback, useRef } from 'react';
import { FiTrash } from 'react-icons/fi';
import Modal from '../Modal';
import { Container } from './styles';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

interface ICreateFoodData {
  name: string;
  image: string;
  price: string;
  description: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleDeleteFood: (id: number) => void;
  deletingFood: IFoodPlate;
}

const ModalDeleteFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleDeleteFood,
  deletingFood,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async () => {
    handleDeleteFood(deletingFood.id);
    setIsOpen();
  }, [handleDeleteFood, setIsOpen]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <h1>Deletar Prato</h1>
        <p>Deseja deletar o prato {deletingFood.name}?</p>
        <button onClick={() => handleSubmit()} data-testid="delete-food-button">
          <p className="text">Deletar Prato</p>
          <div className="icon">
            <FiTrash size={24} />
          </div>
        </button>
      </Container>
    </Modal>
  );
};

export default ModalDeleteFood;
