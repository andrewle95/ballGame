import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { NavController } from 'ionic-angular';

import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  /**
  * 'plug into' DOM canvas element using @ViewChild
  */
  @ViewChild('canvas') canvasEl: ElementRef;



  /**
    * Reference Canvas object
    */
  private _CANVAS: any;



  /**
    * Reference the context for the Canvas element
    */
  private _CONTEXT: any;

  public posX = 25;
  public posY = 25;
  constructor(public navCtrl: NavController, private screenOrientation: ScreenOrientation, private deviceMotion: DeviceMotion) {
    // set to landscape
    console.log(this.screenOrientation.type);
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE_PRIMARY)

    const options = {
      frequency: 10
    };
    // Get the device current acceleration
    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
      (error: any) => console.log(error)
    );

    // Watch device acceleration
    var subscription = this.deviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {
      
      if(acceleration.y > 2){
        //postive and not still
        console.log('positive');
        if(this.posX >= 50){
          this.posX -= 5;
        }
        
      }else if (acceleration.y < -2){ 
        //negative and not still
        console.log('negative')
        if(this.posX <= (window.innerWidth-50)){
          this.posX += 5;
        }
      }


      if(acceleration.x > 2){
        //postive and not still
        console.log('positive');
        if(this.posY >= 50){
          this.posY -= 5;
        }
        
      }else if (acceleration.x < -2){ 
        //negative and not still
        console.log('negative')
        if(this.posY <= (200-50)){
          this.posY += 5;
        }
      }
    });

  }
  ionViewDidLoad() {
    this._CANVAS = this.canvasEl.nativeElement
    this._CANVAS.width = window.innerWidth;
    this._CANVAS.height = 200;

    this.initialiseCanvas();
    setInterval(() => {
      this.drawCircle(this.posX,this.posY)
    }, 33);
  }

  initialiseCanvas() {
    if (this._CANVAS.getContext) {
      this.setupCanvas();
    }
  }

  setupCanvas() {
    this._CONTEXT = this._CANVAS.getContext('2d');
    this._CONTEXT.fillStyle = "#fff";
    this._CONTEXT.fillRect(0, 0, 500, 500);
  }

  clearCanvas() {
    this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
    this.setupCanvas();
  }

  drawCircle(posX, posY) {
    console.log('draw');
    this.clearCanvas();
    this._CONTEXT.beginPath();

    // x, y, radius, startAngle, endAngle
    this._CONTEXT.fillStyle = '#1e1e1e';
    this._CONTEXT.arc(posX, posY, 25, Math.PI * 2, false);
    this._CONTEXT.fill();
  }
}