import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPessoaComponent } from './cadastro-pessoa.component';

describe('CadastroPessoaComponent', () => {
  let component: CadastroPessoaComponent;
  let fixture: ComponentFixture<CadastroPessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroPessoaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
