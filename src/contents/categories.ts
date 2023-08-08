import { Category } from "@/types";

export const CATEGORIES_MOCK: Category[] = [
  {
    name: 'Jacket', 
    description: "asd", 
    criterias: [
      {name: "Year", weight: 0.5, min: 1990, max: 2023, cost: false},
      {name: "Condition", weight: 0.5, min: 1, max: 10, cost: false},
    ], 
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZT65OSzFrX6d88xsWu8v-on2ytMvAZ83dzSByipkGjeE_mjY9Y88KS7a9oVvCF5vVpEQ&usqp=CAU",
    published: true
  },
  {
    name: 'Pants', 
    description: "asd", 
    criterias: [
      {name: "Year", weight: 0.5, min: 1990, max: 2023, cost: false},
      {name: "Condition", weight: 0.5, min: 1, max: 10, cost: false},
    ], 
    thumbnail: "https://thumbor.sirclocdn.com/unsafe/640x640/filters:format(webp)/magento.eigeradventure.com/media/catalog/product/cache/cd1064cf96e0921aa13324f8e3f8fe30/9/1/910007829.khk3.jpg",
    published: true
  },
  {
    name: 'Hoodie', 
    description: "asd", 
    criterias: [
      {name: "Year", weight: 0.5, min: 1990, max: 2023, cost: false},
      {name: "Condition", weight: 0.5, min: 1, max: 10, cost: false},
    ], 
    thumbnail: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9vZGllfGVufDB8fDB8fHww&w=1000&q=80",
    published: true
  },
]

export const CATEGORY_CONTENT = {
  title: {
    en: "Categories", 
    id: "Kategori"
  },
  content: {
    description: {
      en: "Category description",
      id: "Deskripsi kategori",
    }, 
    criterias: {
      en: "Criterias",
      id: "Kriteria"
    }
  }
}