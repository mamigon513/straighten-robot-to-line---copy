#This code will stop the robot when it detects a line and get it (mostly) straight 
# according to the line.

def straighten_to_line():
    #keep counter to break while loop
    count = 0

    CutebotPro.pwm_cruise_control(20, 20)
    basic.pause(50)

    # turn on headlights(pink = 247, 25, 236)
    CutebotPro.single_headlights(CutebotProRGBLight.RGBL, 247, 25, 236)
    CutebotPro.single_headlights(CutebotProRGBLight.RGBR, 247, 25, 236)
    #keep turning till we are straight
    while(abs(CutebotPro.get_offset()) > 0 and count < 10):
        # update count of while loop iterations
        count = count + 1
        #get offset
        error = CutebotPro.get_offset()
        # set turn speed
        speed = 20 + (error/3000)*30
        # turn right
        if error > 0:
            #turn on right headlight(blue = 51, 255, 252)
            CutebotPro.single_headlights(CutebotProRGBLight.RGBR, 51, 255, 252)
            CutebotPro.pwm_cruise_control(speed, -1*speed)
            basic.pause(50)
            # turn off headlights
            CutebotPro.turn_off_all_headlights()
        # turn left
        if error < 0:
            #turn on left headlight(blue = 51, 255, 252)
            CutebotPro.single_headlights(CutebotProRGBLight.RGBL, 51, 255, 252)
            CutebotPro.pwm_cruise_control(-1*speed, speed)
            basic.pause(50)
            # turn off headlights
            CutebotPro.turn_off_all_headlights()

        CutebotPro.pwm_cruise_control(0, 0)
        basic.pause(20)

    # turn off headlights
    CutebotPro.turn_off_all_headlights()

def detect_line():
    # get the line tracking offset
    error = CutebotPro.get_offset()
    line = 0
    # detects black line
    if abs(error) < 3000:
        basic.pause(50)
        CutebotPro.pwm_cruise_control(0, 0)
        straighten_to_line()
        line = 1
    return line

def move_forward():
    CutebotPro.pwm_cruise_control(10, 10)
    line_found = 0
    while line_found == 0:
        line_found = detect_line()
    CutebotPro.distance_running(CutebotProOrientation.ADVANCE, 15.35, CutebotProDistanceUnits.CM)
    basic.pause(100)
def turn_left():
    CutebotPro.trolley_steering(CutebotProTurn.LEFT_IN_PLACE, 95)
    basic.pause(100)

def turn_right():
    CutebotPro.trolley_steering(CutebotProTurn.RIGHT_IN_PLACE, 95)
    basic.pause(100)

move_forward()
#turn_left()
move_forward()
#turn_right()
#move_forward()
