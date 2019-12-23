import { Component, OnInit } from '@angular/core';

import { ContatoService } from '../../services/contato.service';
import { Contato } from '../../shared/contato';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  public contatos: Contato[];

  constructor(
    private router: Router,
    private _contatoService: ContatoService
  ) { }

  ngOnInit() {
    this.getAllContatos();
  }

  getAllContatos() {
    this._contatoService.getContatos().subscribe(response => {
      this.contatos = response.map(contato => {
        let novoContato = {
          id: contato.id,
          nome: contato.nome,
          canal: contato.canal,
          valor: contato.valor,
          obs: ''
        }

        if (contato.obs === '') {
          novoContato.obs = 'Não existem observações'
        } else {
          novoContato.obs = contato.obs;
        }

        return novoContato;
      });
    });
  }

  delete(id:string) {
    this._contatoService.delete(id).subscribe(() => {
      this.getAllContatos();
    });
  }

  create() {
    this.router.navigate(['edit']);
  }

  edit(id: string) {
    this.router.navigate(['edit', id]);
  }

}
