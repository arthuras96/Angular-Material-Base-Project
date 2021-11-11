import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastUiImageEditorComponent } from 'ngx-tui-image-editor';

@Component({
  selector: 'app-test-broker',
  templateUrl: './test-broker.component.html',
  styleUrls: ['./test-broker.component.css']
})
export class TestBrokerComponent implements OnInit, AfterViewInit  {
  @ViewChild(ToastUiImageEditorComponent)
  editorComponent: ToastUiImageEditorComponent = 
  new ToastUiImageEditorComponent();
  
  constructor() { }

  urlimg: string = "assets/images/pdfimg.jpg";

  ngOnInit(): void {
    
  }

  async ngAfterViewInit() {
    await this.editorComponent.editorInstance.loadImageFromURL(this.urlimg, 'teste').then(
      result => {
        this.editorComponent.editorInstance.ui.resizeEditor({
          imageSize: {oldWidth: result.oldWidth, oldHeight: result.oldHeight, newWidth: result.newWidth, newHeight: result.newHeight}
        });
        // @ts-ignore
         this.editorComponent.editorInstance.ui.activeMenuEvent();
         // @ts-ignore
         this.editorComponent.editorInstance.ui._activateZoomMenus();
      }
    ).catch(err=>{
      console.error("Error:", err);
    });
  }

  save(): void {
    // @ts-ignore
    this.editorComponent.editorInstance.resetZoom();
    console.log(this.editorComponent.editorInstance.toDataURL());
  }

  cancel(): void {

  }
}
