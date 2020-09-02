function Zoom() {
    this.middleArea = $("#middleArea");
    this.zoom = $("#zoom");
    this.bigArea = $("#bigArea");
    this.bigImg = $("#bigImg");
    this.smallImg = $("#smallArea>img");
}
Zoom.prototype.showZoom = function () {
    this.middleArea.mouseover(()=> {
        this.zoom.show();
        this.bigArea.show();
    })
    this.middleArea.mouseout(()=>{
        this.zoom.hide();
        this.bigArea.hide();
    })
    this.middleArea.mousemove((e)=>{
        var maxW = this.middleArea.outerWidth() - this.zoom.outerWidth();
        var maxH = this.middleArea.outerHeight()-this.zoom.outerHeight();
        var x = e.pageX - this.middleArea.offset().left;
        var y = e.pageY - this.middleArea.offset().top;
        var l = x - this.zoom.outerWidth() / 2;
        var t = y - this.zoom.outerHeight() / 2;
        l = l < 0 ? 0 : l > maxW ? maxW : l;
        t = t < 0 ? 0 : t > maxH ? maxH : t;
        this.zoom.css({ "left": l+"px", "top": t+"px" });
        // this.zoom.position().left/this.middleArea.outerWidth() = this.bigImg.position().left/this.bigImg.outerWidth();
        this.bigImg.css({
            "left":-this.zoom.position().left*this.bigImg.outerWidth()/this.middleArea.outerWidth()+"px",
            "top" : -this.zoom.position().top*this.bigImg.outerHeight()/this.middleArea.outerHeight()+"px"
        });
    })
    for(let i = 0;i<this.smallImg.length;i++){
        this.smallImg[i].onclick = ()=>{
            this.middleArea.find("img").attr("src",this.smallImg[i].getAttribute("src"));
            this.bigImg.attr("src",this.smallImg[i].getAttribute("src"));
        }
    }
    
}