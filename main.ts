// This code will stop the robot when it detects a line and get it (mostly) straight 
//  according to the line.
function straighten_to_line() {
    let speed: number;
    // keep counter to break while loop
    let count = 0
    let error = CutebotPro.getOffset()
    CutebotPro.pwmCruiseControl(20, 20)
    basic.pause(50)
    //  turn on headlights(pink = 247, 25, 236)
    CutebotPro.singleHeadlights(CutebotProRGBLight.RGBL, 247, 25, 236)
    CutebotPro.singleHeadlights(CutebotProRGBLight.RGBR, 247, 25, 236)
    // keep turning till we are straight
    while (Math.abs(error) > 0 && count < 100) {
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
        }
        
        //  turn left
        if (error < 0) {
            // turn on left headlight(blue = 51, 255, 252)
            CutebotPro.singleHeadlights(CutebotProRGBLight.RGBL, 51, 255, 252)
            CutebotPro.pwmCruiseControl(-1 * speed, speed)
            basic.pause(30)
        }
        
        //  turn off headlights
        CutebotPro.turnOffAllHeadlights()
        CutebotPro.pwmCruiseControl(0, 0)
        basic.pause(50)
    }
    //  turn off headlights
    CutebotPro.turnOffAllHeadlights()
}

function detect_line(): number {
    //  get the line tracking offset
    let error = CutebotPro.getOffset()
    let line = 0
    //  detects black line
    if (Math.abs(error) < 3000) {
        basic.pause(50)
        CutebotPro.pwmCruiseControl(0, 0)
        straighten_to_line()
        line = 1
    }
    
    return line
}

function move_forward() {
    CutebotPro.pwmCruiseControl(20, 20)
    let line_found = 0
    while (line_found == 0) {
        line_found = detect_line()
    }
    CutebotPro.distanceRunning(CutebotProOrientation.Advance, 15.35, CutebotProDistanceUnits.Cm)
    basic.pause(100)
}

function turn_left() {
    CutebotPro.trolleySteering(CutebotProTurn.LeftInPlace, 95)
    basic.pause(100)
}

function turn_right() {
    CutebotPro.trolleySteering(CutebotProTurn.RightInPlace, 95)
    basic.pause(100)
}

move_forward()
// turn_left()
move_forward()
