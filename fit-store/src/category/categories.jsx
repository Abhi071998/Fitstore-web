import React from 'react'
import { useGetCategoriesQuery } from '../store/apiSlice';

export default function Categories() {
    const { data: categories, isLoading, error } = useGetCategoriesQuery();
    console.log(categories, isLoading, error);
  return (
    <div>categories</div>
  )
}
