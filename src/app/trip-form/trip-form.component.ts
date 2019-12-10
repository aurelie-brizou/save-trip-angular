import { Component, OnInit, HostListener, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TripService } from '../service/trip.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';


@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})
export class TripFormComponent implements OnInit {

  @Output() dropped =  new EventEmitter<FileList>();
  @Output() hovered =  new EventEmitter<boolean>();
  
  tripForm:FormGroup;
  typesForm$: Observable<Object[]>;

  isHovering: boolean;

  files: File[] = [];

  @Input() file: File;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;


  constructor(
    private tService:TripService,
    private router:Router,
    private httpClient:HttpClient,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.getTypes();
    this.initForm();
    this.startUpload();
  }

  initForm() {
    this.tripForm = this.formBuilder.group( {
      name: ['', Validators.required],
      type: ['', Validators.required],
      photo: '',
      itinerary: '',
      description: ''
    });
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  startUpload() {

    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        this.db.collection('files').add( { downloadURL: this.downloadURL, path });
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }


  getTypes(){
    this.typesForm$ = (this.httpClient.get('./assets/json/types.json') as Observable<Object[]>);
  }



  onSubmit(value){  
    this.tService.createTrip(value)
    .then((res:firebase.firestore.DocumentReference) => {
        // this.resetFields();
        this.router.navigate(['/trips']);
      })
    .catch((error : Error) => {
      console.error(error);
    })
  }



  /*resetFields() {
    throw new Error("Method not implemented.");
  }*/
  
}
