package main

import (
	. "fmt"
	"io"
)

func main() {
	var s string
	var S []string
	for {
		_, e := Scanf("%s", &s)
		if e == io.EOF {
			break
		}
		S = append(S, s)
	}
	for i := len(S) - 1; i >= 0; i-- {
		Printf(S[i])
		if i != 0 {
			Printf(" ")
		}
	}
}
