import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { IProduct } from '../../interfaces/IProduct.interface';
import { localStorageService } from '../../_services/localStorage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  selectedProduct: IProduct | null = null;
  selectedFile: File | null = null;
  showAddProductPopup = false;
  products: IProduct[] = [];
  isLoggedIn = false;
  userRole = '';

  newProduct: IProduct = {
    name: '',
    price: 0,
    description: '',
    imagePath: '',
    _id: '',
  };

  constructor(
    private productService: ProductService,
    private localStorage: localStorageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.localStorage.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.localStorage.getUser();
      this.userRole = user.role;
    }

    this.productService.getAllProducts().subscribe((response) => {
      console.log('Products:', response.data);
      this.products = response.data;
    });
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: (res) => {
        this.products = this.products.filter((p) => p._id !== id);
      },
      error: (err) => {
        alert('Error deleting product');
        console.error(err);
      },
    });
  }

  openAddProductPopup() {
    this.newProduct = {
      name: '',
      price: 0,
      description: '',
      imagePath: '',
      _id: '', // Assuming _id is optional for new products
    };
    this.selectedFile = null;
    this.showAddProductPopup = true;
  }

  submitNewProduct() {
    if (!this.newProduct.name.trim()) {
      alert('Name is required');
      return;
    }
    if (this.newProduct.price < 0) {
      alert('Price must be zero or more');
      return;
    }
    if (!this.selectedFile) {
      alert('Image is required');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.newProduct.name);
    formData.append('price', this.newProduct.price.toString());
    formData.append('description', this.newProduct.description);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }
    this.productService.addProduct(formData).subscribe({
      next: (res) => {
        this.products.push(res.data);
        this.showAddProductPopup = false;
      },
      error: (err) => {
        alert('Error adding product');
        console.error(err);
      },
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  selectProduct(product: IProduct) {
    this.selectedProduct = product;
  }

  closePopup() {
    this.selectedProduct = null;
  }

  closeAddProductPopup() {
    this.showAddProductPopup = false;
  }
}
