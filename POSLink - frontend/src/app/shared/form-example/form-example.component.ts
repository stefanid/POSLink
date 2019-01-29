import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Hero } from './hero';
import { sidekickControl, validateEmail, validateZipcode } from '../../core/validation';

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html'
})

export class FormExampleComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];
  sidekicks = ['Batman', 'Robin Hood', 'Superman', 'Superwoman', 'Robin'];

  model = new Hero(18, 'Seblicious', this.powers[0], this.sidekicks[1], 'superjuice@spicyckicken.dk' , 'Swaglicious');

  onSubmit() {
    this.submitted = true;
  }

  newHero() {
    this.model = new Hero(42, '', '', '', '');
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.minLength(3)],
      alterEgo: ['', Validators.required],
      power: ['', Validators.required],
      sidekick: ['', [Validators.required, sidekickControl]] /* Example of custom validation */,
      email: ['', [Validators.required, validateEmail]] /* Example of custom validation */
    });
  }

}
