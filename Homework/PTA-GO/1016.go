package main

import (
	. "fmt"
	. "strconv"
)

func main() {
	var A, DA, PA, B, DB, PB string
	Scanf("%s%s%s%s", &A, &DA, &B, &DB)
	for _, v := range A {
		if Sprintf("%c", v) == DA {
			PA += Sprintf("%c", v)
		}
	}
	for _, v := range B {
		if Sprintf("%c", v) == DB {
			PB += Sprintf("%c", v)
		}
	}
	iPA, _ := Atoi(PA)
	iPB, _ := Atoi(PB)
	Println(iPA + iPB)
}
