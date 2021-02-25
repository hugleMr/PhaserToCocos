const {ccclass, property} = cc._decorator;

type UndoInfo = {
    balls : any[],
    score : number,
    hscore : number
}

@ccclass
export class NewClass extends cc.Component {

    @property(cc.JsonAsset)
    json : cc.JsonAsset = null;

    @property(cc.SpriteFrame)
    img : cc.SpriteFrame = null;

    convert () {
        type info = {
            name : string,
            rotated : "",
            frame : {
                x : "",
                y: "",
                w : "",
                h : ""
            },
            src : {
                x : "",
                y: "",
                w : "",
                h : ""
            },
            sourceSize : {
                "w": "",
                "h": ""
            }
        }

        console.log(this.json.json.frames);
        console.log(Object.keys(this.json.json.frames).length);
        let list = this.json.json.frames;
        let listName = Array.from(Object.keys(list));

        console.log(listName);
        
        let allItem = [];
        let index = -1;
        for(var i in list){
            let obj = list[i];
            index++;
            let item : info = {
                name : i,
                rotated : obj.rotated,
                frame : {
                    x : obj.frame.x,
                    y: obj.frame.y,
                    w : obj.frame.w,
                    h : obj.frame.h
                },
                src : {
                    x : obj.spriteSourceSize.x,
                    y: obj.spriteSourceSize.y,
                    w : obj.spriteSourceSize.w,
                    h : obj.spriteSourceSize.h
                },
                sourceSize : {
                    w: obj.sourceSize.w,
                    h: obj.sourceSize.h
                }
            }

            allItem.push(item);
        }

        let text = this.getTextFirst();
        text += "<dict>\n";
        text += "<key>frames</key>\n";
        text += "<dict>\n";
        for(var i in allItem){
            let item = allItem[i];
            text += this.getElementFormat(item);
        }
        text += "</dict>\n";

        text += this.getTextMetaData();

        console.log(text);
    }

    getImgSize(){
        let rect = this.img.getRect();
        return cc.v2(rect.width,rect.height);
    }

    getImgName(){
        return this.img.name;
    }

    getTextFirst(){
        return '<?xml version=\"1.0\" encoding=\"UTF-8\"?> \n<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\"> \n<plist version=\"1.0\"> \n'
    }

    getTextMetaData(name?,size?){
        let text = '<key>metadata</key>\n<dict>\n\t<key>format</key>\n\t<integer>2</integer>\n\t<key>pixelFormat</key>\n\t<string>RGBA8888</string>\n\t<key>premultiplyAlpha</key>\n\t<false/>\n\t<key>realTextureFileName</key>\n\t';
        text += "<string>" + this.getImgName() + ".png</string>\n\t";
        text += "<key>size</key>\n\t";
        text += "<string>{" + this.getImgSize().x + "," + this.getImgSize().y + "}</string>\n\t";
        text += "<key>textureFileName</key>\n\t";
        text += "<string>" + this.getImgName() + "</string>\n";
        text += "</dict>\n"
        text += "</dict>\n";
        text += "</plist>";
        return text;
    }

    getElementFormat(info){
        let text = "\t<key>";
        text += info.name + ".png";
        text += "</key>\n\t<dict>\n\t";
        text += "<key>frame</key>\n\t\t";
        text += "<string>{{";
        text += info.frame.x + "," + info.frame.y + "},{";
        text += info.frame.w + "," + info.frame.h + "}}</string>\n\t\t"
        text += "<key>offset</key>\n\t\t";
        text += "<string>{0,0}</string>\n\t\t";
        text += "<key>rotated</key>\n\t\t<" + info.rotated + "/>\n\t\t";
        text += "<key>sourceColorRect</key>\n\t\t<string>{{";
        text += info.src.x + "," + info.src.y + "},{";
        text += info.src.w + "," + info.src.h + "}}</string>\n\t\t";
        text += "<key>sourceSize</key>\n\t\t<string>";
        text += "{" + info.sourceSize.w + "," + info.sourceSize.h + "}</string>\n\t";
        text += "</dict>\n";
        return text;
    }
}
