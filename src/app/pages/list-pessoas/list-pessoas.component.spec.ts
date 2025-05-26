import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPessoasComponent } from './list-pessoas.component';

describe('ListPessoasComponent', () => {
  let component: ListPessoasComponent;
  let fixture: ComponentFixture<ListPessoasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPessoasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
