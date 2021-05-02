pins.onPulsed(DigitalPin.P1, PulseValue.High, function () {
    Read += 1
    if (Read == 16) {
        Count_p += 1
        Read = 0
    }
})
function update_rots () {
    if (updt_disp) {
        serial.writeLine("" + Count_n + "  L  " + Read + " - " + Count_p + "  R  " + Read2)
    }
}
pins.onPulsed(DigitalPin.P0, PulseValue.High, function () {
    Read2 += 1
    if (Read2 == 16) {
        Count_n += 1
        Read2 = 0
    }
})
let prev_count_p = 0
let prev_count_n = 0
let Read2 = 0
let Count_n = 0
let updt_disp = false
let Count_p = 0
let Read = 0
Read = 0
pins.setPull(DigitalPin.P0, PinPullMode.PullUp)
pins.setPull(DigitalPin.P1, PinPullMode.PullUp)
maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 30)
maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 40)
serial.writeLine("")
basic.forever(function () {
    maqueen.servoRun(maqueen.Servos.S1, 171)
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
    basic.pause(500)
    maqueen.servoRun(maqueen.Servos.S1, 10)
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
    basic.pause(500)
})
basic.forever(function () {
    if (prev_count_n != Count_n) {
        prev_count_n = Count_n
        updt_disp = true
    }
    if (prev_count_p != Count_p) {
        prev_count_p = Count_p
        updt_disp = true
    }
    update_rots()
    basic.pause(20)
})
