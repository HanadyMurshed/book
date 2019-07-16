//npm install -g ts-node
//npm install --save event-stream
//fs.createReadStream() search for this approuche


class Excersuxe1{
    private fs = require('fs')
    private es = require('event-stream');
    private lineNumber : number = 0;
    private data:any[]=[];

    constructor() { }


    private LaodStopWords(){
        this.fs.readFile('Text Folder\\stopwords.txt', (err: any, data: any) => {
            if (err) {
                return console.error(err);
            }
            this.data[0]= data.toString().split('\n');
            //console.log(this.data[0][5])
        });

    }



    static isLetter(str:string) {
        return str.length === 1 && str.match(/[a-z]/i);
    }

    ReadLineByLine(){

        this.LaodStopWords();
        var s = this.fs.createReadStream('Text Folder\\dummy.txt')
        .pipe(this.es.split())
        .pipe(this.es.mapSync((line:string)=>{ //line is a problem 
    
            // pause the readstream
            s.pause();


            this.data[1]=line;

            this.lineNumber += 1;//for now not needed 

            //start line prossceing 
            if(this.data[1] == '') 
             {return ;}
            if (this.data[1][(this.data[1].length)-1] != '\n')
               {this.data[1]+= '\n'}
            this.data[2] = undefined;
            this.data[3] = 0;

            for( var c in this.data[1]){
                if (this.data[2] == undefined){
                    if (Excersuxe1.isLetter(c))// We found the start of a word
                        this.data[2] = this.data[3];
                    }
                else{
                    if (!Excersuxe1.isLetter(c))
                        this.data[1] = this.data[1] + '\n';
                    }
                }

            // resume the readstream, possibly from a callback
            s.resume();
        })
        .on('error', function(err: any){
            console.log('Error while reading file.', err);
        })
        .on('end', function(){
            console.log('Read entire file.')
        })
    );
    }
  
}


let test: Excersuxe1 = new Excersuxe1();
