import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListSearchComicComponent } from './list-search-comic.component';


describe('ListSearchComicComponent', () => {
    let component: ListSearchComicComponent;
    let fixture: ComponentFixture<ListSearchComicComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListSearchComicComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ListSearchComicComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
