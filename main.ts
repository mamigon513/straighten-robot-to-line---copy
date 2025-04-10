// This code will stop the robot when it detects a line and get it (mostly) straight 
//  according to the line. Perhaps make it so 
function straighten_to_line() {
    let error: number;
    let speed: number;
    // keep counter to break while loop
    let count = 0
    CutebotPro.pwmCruiseControl(20, 20)
    basic.pause(50)
    //  turn on headlights(pink = 247, 25, 236)
    CutebotPro.singleHeadlights(CutebotProRGBLight.RGBL, 247, 25, 236)
    CutebotPro.singleHeadlights(CutebotProRGBLight.RGBR, 247, 25, 236)
    // keep turning till we are straight
    while (Math.abs(CutebotPro.getOffset()) > 0 && count < 10) {
        //  update count of while loop iterations
        count = count + 1
        // get offset
        error = CutebotPro.getOffset()
        //  set turn speed
        speed = 30 + error / 3000 * 70
        //  turn right
        if (error > 0) {
            // turn on right headlight(blue = 51, 255, 252)
            CutebotPro.singleHeadlights(CutebotProRGBLight.RGBR, 51, 255, 252)
            CutebotPro.pwmCruiseControl(speed, -1 * speed)
            basic.pause(30)
            //  turn off headlights
            CutebotPro.turnOffAllHeadlights()
        }
        
        //  turn left
        if (error < 0) {
            // turn on left headlight(blue = 51, 255, 252)
            CutebotPro.singleHeadlights(CutebotProRGBLight.RGBL, 51, 255, 252)
            CutebotPro.pwmCruiseControl(-1 * speed, speed)
            basic.pause(30)
            //  turn off headlights
            CutebotPro.turnOffAllHeadlights()
        }
        
        CutebotPro.pwmCruiseControl(0, 0)
        basic.pause(20)
    }
    //  turn off headlights
    CutebotPro.turnOffAllHeadlights()
    //  go forward again
    CutebotPro.distanceRunning(CutebotProOrientation.Advance, 15.35, CutebotProDistanceUnits.Cm)
}

CutebotPro.pwmCruiseControl(10, 10)
basic.forever(function detect_line() {
    //  get the line tracking offset
    let error = CutebotPro.getOffset()
    //  detects black line
    if (Math.abs(error) < 3000) {
        CutebotPro.pwmCruiseControl(0, 0)
        straighten_to_line()
    }
    
})
