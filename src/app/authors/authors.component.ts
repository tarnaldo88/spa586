import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Authors {
  constructor(
    public AuthorId: number,
    public Name: string
  ) {
  }
}

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  authors: Authors[] = [];
  constructor(private httpClient: HttpClient){
  }

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(){
    this.httpClient.get<any>('http://13.52.231.44/Server/api/Authors').subscribe(
      response => {
        console.log(response);
        this.authors = response;
      }
    );
  }

  onSubmit(data){      
    console.log(data);
    this.httpClient.post('http://13.52.231.44/Server/api/Authors', data)
    .subscribe((result)=>{
      console.log("result", result)
    })
  }


}


// <form #userPost="ngForm" (ngSubmit) = "onSubmit(userPost.value)" >
//         <label for="fname">Enter a New Author </label><br>
//         <input type="text"  name="name" ngModel><br><br>        
//         <button class="btn btn-primary" type="submit"> Submit </button>
//       </form>