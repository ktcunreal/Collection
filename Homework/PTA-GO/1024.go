package main

import (
	. "fmt"
	. "strings"
)

func main() {
	var (
		s string
		e int
	)
	Scanf("%s", &s)
	idx := Index(s, "E")
	Sscanf(s[idx+1:], "%d", &e)
	if Sprintf("%c", s[0]) == "-" {
		Printf("-")
	}
	if e < 0 {
		Printf("0.")
		for i := 1; i < -e; i++ {
			Printf("0")
		}
		Printf("%c%s", s[1], s[3:idx])
	} else {
		prec := idx - 3 - e
		body := Sprintf("%c", s[1]) + s[3:idx]
		if prec > 0 {
			Printf("%v.%v", body[:len(body)-prec], body[len(body)-prec:])
		} else {
			Printf("%v", body)
			for i := 0; i < -prec; i++ {
				Printf("0")
			}
		}
	}
}
