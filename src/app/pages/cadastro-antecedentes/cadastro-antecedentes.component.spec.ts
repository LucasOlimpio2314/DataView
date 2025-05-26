import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAntecedenteComponent } from './cadastro-antecedentes.component';

describe('CadastroAntecedentesComponent', () => {
  let component: CadastroAntecedenteComponent;
  let fixture: ComponentFixture<CadastroAntecedenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroAntecedenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroAntecedenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
