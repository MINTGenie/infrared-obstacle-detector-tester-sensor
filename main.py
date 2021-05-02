def on_pulsed_p1_high():
    global Read, Count_p
    Read += 1
    if Read == 16:
        Count_p += 1
        Read = 0
pins.on_pulsed(DigitalPin.P1, PulseValue.HIGH, on_pulsed_p1_high)

def on_pulsed_p0_high():
    global Read2, Count_n
    Read2 += 1
    if Read2 == 16:
        Count_n += 1
        Read2 = 0
pins.on_pulsed(DigitalPin.P0, PulseValue.HIGH, on_pulsed_p0_high)

prev_count_p = 0
prev_count_n = 0
Count_n = 0
Read2 = 0
Read = 0
Read = 0
Count_p = 0
pins.set_pull(DigitalPin.P0, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P1, PinPullMode.PULL_UP)
maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 30)
maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 40)
serial.write_line("")

def on_forever():
    maqueen.servo_run(maqueen.Servos.S1, 171)
    maqueen.write_led(maqueen.LED.LED_LEFT, maqueen.LEDswitch.TURN_ON)
    maqueen.write_led(maqueen.LED.LED_RIGHT, maqueen.LEDswitch.TURN_ON)
    basic.pause(500)
    maqueen.servo_run(maqueen.Servos.S1, 10)
    maqueen.write_led(maqueen.LED.LED_LEFT, maqueen.LEDswitch.TURN_OFF)
    maqueen.write_led(maqueen.LED.LED_RIGHT, maqueen.LEDswitch.TURN_OFF)
    basic.pause(500)
basic.forever(on_forever)

def on_forever2():
    global prev_count_n, prev_count_p
    if prev_count_n != Count_n:
        prev_count_n = Count_n
    if prev_count_p != Count_p:
        prev_count_p = Count_p
    basic.pause(300)
basic.forever(on_forever2)
