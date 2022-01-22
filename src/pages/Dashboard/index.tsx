import React, { useEffect, useState } from 'react';
import Food from '../../components/Food';
import Header from '../../components/Header';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import api from '../../services/api';
import { FoodsContainer } from './styles';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const foodsResponse = await api.get('/foods');
      setFoods(foodsResponse.data);
      console.log(foodsResponse);
    }

    loadFoods();
  }, []); // Esse Array de dependencias está vazio pq a função loadFoods
  // deve ser executada apenas quando o dashbord for montado na tela do usuário

  async function handleAddFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    try {
      const newFood = await api.post('/foods', food);
      setFoods([...foods, newFood.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: IFoodPlate): Promise<void> {
    console.log({ food });
    try {
      const newFood = await api.put(`/foods/${food.id}`, food);
      const filteredList = foods.filter(f => f.id !== food.id);
      const newFoodList = [...filteredList, newFood.data].sort((a, b) =>
        a.id < b.id ? -1 : 1,
      );
      setFoods(newFoodList);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number): Promise<void> {
    await api.delete(`/foods/${id}`);
    const filteredList = foods.filter(f => f.id !== id);
    setFoods(filteredList);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFoodPlate): void {
    setEditingFood(food);
    console.log({ food });
    toggleEditModal();
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
              handleUpdateFood={handleUpdateFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
