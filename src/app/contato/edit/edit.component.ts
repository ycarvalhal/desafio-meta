import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ContatoService } from 'src/app/services/contato.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  private id:string;

  public canais:string[] = ['Email', 'Celular', 'Fixo'];
  public canal:string = 'email';
  public contatoForm:FormGroup = this.formBuilder.group({
    id: [null],
    nome: ['', [Validators.required]],
    canal: ['', [Validators.required]],
    valor: ['', [Validators.required]],
    obs: [''],
  });
  public submitted:boolean = false;
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _contatoService: ContatoService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    
    if (this.id !== null) {
      this._contatoService.getContato(this.id).subscribe(contato => {
        this.contatoForm.setValue(contato);
      });
    } else {
      this.contatoForm.controls.canal.patchValue(this.canais[0]);
    }
  }

  get formFields() { return this.contatoForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.contatoForm.invalid) { return }

    let data = this.contatoForm.value;
    if (this.id !== null) {
      this._contatoService.update(this.id, data).subscribe(() => {
        this.submitted = false;
        this.contatoForm.reset();
        this.router.navigate(['']);
      });
    } else {
      this._contatoService.insert(data).subscribe(() => {
        this.submitted = false;
        this.contatoForm.reset();
        this.router.navigate(['']);
      })
    }
  }

}
