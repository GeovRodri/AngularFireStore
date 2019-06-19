import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: any;
  items: any;

  constructor(public afAuth: AngularFireAuth, db: AngularFirestore) {
    this.afAuth.auth.signInAnonymously();

    this.user = this.afAuth.authState;

    const data = {
      'empresa_id': db.doc('/empresas/wTpgOJrLFT1qBJq4PdT9').ref,
      'usuario_id': db.doc('/usuarios/mg1OpXYRVhikpkralPnr').ref
    };

    db.collection('empresas_usuarios').add(data);

    db.collection('empresas_usuarios').doc('U9BiIa6gvGZVhbLC9vHf').valueChanges().subscribe((data: any) => {
      data.empresa_id.get().then((result) => {
        console.log('Document - Empresa: ', result.data());
      });

      data.usuario_id.get().then((result) => {
        console.log('Document - Usuario:', result.data());
      });
    });

    db.collection('empresas_usuarios', ref => ref.where('empresa_id/nome', '==', 'Stay')).valueChanges().subscribe((data: any) => {
      console.log('Where : ', data);
      /*data.empresa_id.get().then((result) => {
        console.log('Where - Empresa: ', result.data());
      });

      data.usuario_id.get().then((result) => {
        console.log('Where - Usuario:', result.data());
      });*/
    });
  }
}
