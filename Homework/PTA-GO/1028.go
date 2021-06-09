package main

import (
	"bufio"
	. "fmt"
	"os"
)

const MAX int = 2014*365 + 9*30 + 6
const MIN int = 1814*365 + 9*30 + 6

var (
	ageold, ageyoung int
	old, young       string
	input            = bufio.NewScanner(os.Stdin)
)

func main() {
	c, T, F := 0, 0, true
	Scanf("%d", &T)
	input.Split(bufio.ScanWords)
	for i := 0; i < T; i++ {
		age, name := inputReader()
		if age > MAX || age < MIN {
			continue
		}
		c++
		if F {
			old, young = name, name
			ageold, ageyoung = age, age
			F = false
			continue
		}
		if age < ageold {
			ageold = age
			old = name
			continue
		}
		if age > ageyoung {
			ageyoung = age
			young = name
			continue
		}
	}
	if c == 0 {
		Printf("0")
	} else {
		Printf("%d %s %s\n", c, old, young)
	}
}
func btoi(b []byte) (res int) {
	if b[0] == 45 {
		for i := 1; i < len(b); i++ {
			v := b[i] - '0'
			res *= 10
			res += int(v)
		}
		res = -res
	} else {
		for i := 0; i < len(b); i++ {
			v := b[i] - '0'
			res *= 10
			res += int(v)
		}
	}
	return
}
func inputReader() (age int, name string) {
	input.Scan()
	name = input.Text()
	input.Scan()
	b := input.Bytes()
	y, m, d := btoi(b[0:4]), btoi(b[5:7]), btoi(b[8:])
	age = y*365 + m*30 + d
	return
}

/*func calcAge() (age int) {
	var tby, tbm, tbd int
	Scanf("%d/%d/%d", &tby, &tbm, &tbd)
	age = tby*365 + tbm*30 + tbd
	return
}*/
