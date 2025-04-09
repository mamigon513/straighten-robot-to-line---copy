#This code will stop the robot when it detects a line and get it (mostly) straight 
# according to the line. Perhaps make it so 

def straighten_to_line():
    #keep counter to break while loop
    count = 0

    CutebotPro.pwm_cruise_control(0, 0)
    basic.pause(100)

    # turn on headlights(pink = 247, 25, 236)
    CutebotPro.single_headlights(CutebotProRGBLight.RGBL, 247, 25, 236)
    CutebotPro.single_headlights(CutebotProRGBLight.RGBR, 247, 25, 236)
    #keep turning till we are straight
    while(abs(CutebotPro.get_offset()) > 0 or count < 20):
        # update count of while loop iterations
        count = count + 1
        #get offset
        error = CutebotPro.get_offset()
        # set turn speed
        speed = 30 + (error/3000)*70
        # turn right
        if error > 0:
            #turn on right headlight(blue = 51, 255, 252)
            CutebotPro.single_headlights(CutebotProRGBLight.RGBR, 51, 255, 252)
            CutebotPro.pwm_cruise_control(speed, -1*speed)
            basic.pause(30)
            # turn off headlights
            CutebotPro.turn_off_all_headlights()
        # turn left
        if error < 0:
            #turn on left headlight(blue = 51, 255, 252)
            CutebotPro.single_headlights(CutebotProRGBLight.RGBL, 51, 255, 252)
            CutebotPro.pwm_cruise_control(-1*speed, speed)
            basic.pause(30)
            # turn off headlights
            CutebotPro.turn_off_all_headlights()

            CutebotPro.pwm_cruise_control(0, 0)
            basic.pause(20)

        # turn off headlights
        CutebotPro.turn_off_all_headlights()
        # go forward again
        CutebotPro.pwm_cruise_control(20, 20)
        basic.pause(1000)

def detect_line():
    # get the line tracking offset
    error = CutebotPro.get_offset()
    
    # detects black line
    if abs(error) < 3000:
        straighten_to_line()


CutebotPro.pwm_cruise_control(20, 20)
basic.forever(detect_line)
