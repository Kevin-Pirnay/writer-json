const fs = require('fs')


module.exports = class Writer
{
    constructor(file)
    {
        this.file = file
        this.fs = require('fs')
    }

    //Warning!!! remember data must have a dynamic key and with a shape -> data[key] = add
    writing = (data)=>
    {
        this.fs.readFile(this.file,(err,dataOriginFile)=>
            {
                if(err) return err

                try{
                    const read =  JSON.parse(dataOriginFile)
                    this.writeData(read,data)

                }catch{
                    this.writeNewData(data)
                }
            }
        );
    }


    writeData = (readData,data)=>
    {
        readData[Object.keys(data)[0]] = data[Object.keys(data)[0]]
        const writable =  JSON.stringify(readData, null, 2)
        this.fs.writeFile(this.file,writable,(err=>err))
        console.log('writeData');
    }


    writeNewData = (addData)=>
    {
        const writable =  JSON.stringify(addData, null, 2)
        this.fs.writeFile(this.file,writable,(err=>err))
        console.log('writeNewData');
    }
}
