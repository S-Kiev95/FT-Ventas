export interface Product {
  id: number;
  attributes: {
    nombre: string;
    precioCompra: number;
    precioVenta: number;
    stock: string;
    descripcion: Array<{
      type: string;
      children: Array<{
        text: string;
        type: string;
      }>;
    }>;
    oferta: boolean;
    cantidadOferta: number | null;
    unidades: number;
    imagen: Array<{
      type: string;
      children: Array<{
        url?: string;
        type: string;
        text: string;
        children?: Array<{
          text: string;
          type: string;
        }>;
      }>;
    }>;
  };
}