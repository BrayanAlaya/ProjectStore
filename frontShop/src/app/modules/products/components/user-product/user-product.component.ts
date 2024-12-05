import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/Product';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmLogComponent } from '../confirm-log/confirm-log.component';
import { ProductsService } from '../../services/products.service';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/states/app.state';
import { User } from 'src/app/core/models/User';
import { loadProducts } from 'src/app/states/products/products.actions';

@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.scss']
})

export class UserProductComponent implements OnInit {

  @Input() product!: Product

  public _s3URL: string = environment.s3url
  private token: any
  public image!: string
  private user: User | null

  constructor(
    public dialog: MatDialog,
    private _productService: ProductsService,
    private _userService: UserService,
    private _store: Store<AppState>
  ) {
    this.token = _userService.getLocalToken()
    this.user = _userService.getLocalUSer()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmLogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        this._productService.delete(this.product.id, this.token).subscribe({
          next: (response: any) => {
            if (parseInt(response.status) == 200) {
              this._store.dispatch(loadProducts({name: "", page: 0,user:  this.user?.id, category: "", id: ""}))
          
            }
          }
        })

      }
    });
  }
 
  ngOnInit(): void {

    if (this.product.image != '[]') {
      this.image = this._s3URL + JSON.parse(this.product.image == undefined ? "" : this.product.image.toString())[0]
    } else{
      this.image = "../../../../../assets/imageNotFound.png"
    }
  }



}
