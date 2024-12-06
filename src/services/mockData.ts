import { Product } from '../types/product';

export const mockProducts: Product[] = [
  {
    id: 1,
    attributes: {
      nombre: "Axe",
      precioCompra: 80,
      precioVenta: 110,
      stock: "10",
      descripcion: [
        {
          type: "paragraph",
          children: [
            {
              text: "Desodorantes Axe",
              type: "text"
            }
          ]
        }
      ],
      oferta: false,
      cantidadOferta: null,
      unidades: 1,
      imagen: [
        {
          type: "paragraph",
          children: [
            {
              text: "",
              type: "text"
            },
            {
              url: "https://www.saul.com.uy/content/images/thumbs/0044748_2693d1c4e09f798a099b055b4e4f25c8a30ff7fb2f2114fe946289703b7bcaf2_450.jpeg",
              type: "link",
              children: [
                {
                  text: "https://www.saul.com.uy/content/images/thumbs/0044748_2693d1c4e09f798a099b055b4e4f25c8a30ff7fb2f2114fe946289703b7bcaf2_450.jpeg",
                  type: "text"
                }
              ]
            },
            {
              text: "",
              type: "text"
            }
          ]
        }
      ]
    }
  }
];