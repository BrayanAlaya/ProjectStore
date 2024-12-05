import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/states/app.state';
import { Observable } from 'rxjs';
import { selectCategories } from 'src/app/states/category/category.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/User';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.scss']
})
export class VenderComponent {

  public srcImage: Array<Object> = []
  public imagesArray: any = []
  public srcIndex: number = 0
  public venderForm: FormGroup
  public statusMessage: string = ""
  public status: boolean | undefined
  private token: String | null
  public categories$: Observable<any> = new Observable()
  public buttonStatus: boolean = true
  public title!: string
  public buttonText!: string
  public updateUpload: boolean = true
  private user!: User | null
  private productId: number | string | undefined

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductsService,
    private _userService: UserService,
    private _store: Store<AppState>,
    private _route: ActivatedRoute,
    private _r: Router,
  ) {
    this.venderForm = this._fb.group({
      name: ["", [Validators.required, Validators.maxLength(40)]],
      price: ["", [Validators.required, Validators.pattern(/^\d{1,4}(\.\d{1,2})?$/)]],
      amount: ["", [Validators.required, Validators.pattern(/^\d{1,4}$/)]],
      description: ["", [Validators.required, Validators.maxLength(500)]],
      category: ["", [Validators.required]],
    })

    this.token = this._userService.getLocalToken()
    this.user = this._userService.getLocalUSer()
    this.categories$ = this._store.select(selectCategories)
    this.setFields()
  }

  setFields(): void {
    this._route.queryParams.subscribe(params => {
      if (params["id"]) {
        this.title = "Actualizar venta"
        this.buttonText = "Actualizar"
        this.productId = params["id"]
        this._productService.get("", "", this.user?.id, "", params["id"]).subscribe({
          next: (response: any) => {
            if (parseInt(response.status) == 200) {
              this.venderForm.patchValue({
                name: response.data[0].name,
                price: response.data[0].price,
                amount: response.data[0].stock,
                description: response.data[0].description,
                category: response.data[0].category_id,
              })
              this.updateUpload = false
              this.srcImage = []
              const images = JSON.parse(response.data[0].image)
              for (let i = 0; i < images.length; i++) {
                this.srcImage.push(environment.s3url + images[i])
              }
            } else if (parseInt(response.status) == 401) {
              this._userService.closeSesion()
            }
          }
        })
      } else {
        this.srcImage = []
        this.venderForm.reset()
        this.status = undefined
        this.statusMessage = ""
        this.title = "Vender"
        this.srcImage.push("../../../../../assets/imageNotFound.png")
        this.buttonText = "Publicar"
        this.productId = undefined
      }
    })

  }

  onSubmit(): void {
    if (!this.venderForm.get("name")?.valid) {
      this.status = false
      this.statusMessage = "Llenar todos los campos"
      return
    }
    if (!this.venderForm.get("price")?.valid) {
      this.status = false
      this.statusMessage = "Precio ingresado es incorrecto"
      return
    }
    if (!this.venderForm.get("amount")?.valid) {
      this.status = false
      this.statusMessage = "Cantidad ingresada incorrecta"
      return
    }
    if (!this.venderForm.get("description")?.valid) {
      this.status = false
      this.statusMessage = "Llenar todos los campos"
      return
    }
    if (!this.venderForm.get("category")?.valid) {
      this.status = false
      this.statusMessage = "Elegir una categoria"
      return
    }

    if (this.imagesArray.length < 1 && this.updateUpload) {
      this.status = false
      this.statusMessage = "Elegir almenos una imagen"
      return
    }

    if (!this.venderForm.valid) {
      this.status = false
      this.statusMessage = "Llenar los campos correctamente"
      return
    }

    this.buttonStatus = false
    this.status = true
    this.statusMessage = "Espera......."

    const productData: FormData = new FormData()
    productData.append("name", this.venderForm.value.name)
    productData.append("price", this.venderForm.value.price)
    productData.append("stock", this.venderForm.value.amount)
    productData.append("description", this.venderForm.value.description)
    productData.append("category_id", this.venderForm.value.category)
    for (let i = 0; i < this.imagesArray.length; i++) {
      productData.append("image", this.imagesArray[i])
    }

    if (this.productId) {
      this.updateProduct(productData)
    } else {
      this.createProduct(productData)
    }
  }

  createProduct(productData: FormData): void {
    this._productService.create(productData, this.token).subscribe({
      next: (response: any) => {

        if (parseInt(response.status) == 200) {
          this.status = true
          this.statusMessage = "Producto publicado correctamente"

          this._r.navigate(["/user/products"])

        } else if (parseInt(response.status) == 401) {
          this._userService.closeSesion()
        } else {
          this.buttonStatus = true
          this.status = false
          this.statusMessage = "Hubo un error al publicar el producto"
        }
      }
    })
  }
  updateProduct(productData: FormData): void {
    this._productService.update(productData, this.token, this.productId).subscribe({
      next: (response: any) => {

        if (parseInt(response.status) == 200) {
          this.status = true
          this.statusMessage = "Producto actualizado correctamente"

          this._r.navigate(["/user/products"])

        } else if (parseInt(response.status) == 401) {
          this._userService.closeSesion()
        } else {
          this.buttonStatus = true
          this.status = false
          this.statusMessage = "Hubo un error al actualizar el producto"
        }

      }
    })
  }

  uploadimage(e: any): void {

    let images = e.target.files

    if (images.length > 0 && images.length < 5) {
      this.srcImage = []
      this.imagesArray = []
      this.srcIndex = 0
      this.updateUpload = true
      for (let i = 0; i < images.length; i++) {
        this.imagesArray.push(images[i]);

        var reader = new FileReader();
        reader.readAsDataURL(images[i])
        reader.onload = (event: any) => {
          this.srcImage.push(event.target.result)
        }
      }
    }
  }

  deleteImage(): void {
    this.updateUpload = true
    this.imagesArray = []
    this.srcImage = []
    this.srcIndex = 0
    this.srcImage.push("../../../../../assets/imageNotFound.png")
  }

  onSliderIconBackClick(): void {
    if (this.srcIndex > 0) {
      this.srcIndex--
    }
  }

  onSliderIconForwardClick(): void {
    if (this.srcIndex < this.srcImage.length - 1) {
      this.srcIndex++
    }
  }
}
