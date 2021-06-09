package main

import (
	"bufio"
	. "fmt"
	"os"
	. "unicode"
)

var (
	sb  = make([]bool, 128)
	str string
)

func main() {
	input := bufio.NewReader(os.Stdin)
	u, _ := input.ReadString('\n')
	for _, v := range u {
		sb[ToUpper(v)] = true
	}
	str, _ := input.ReadString('\n')
	for _, v := range str {
		if !sb[ToUpper(v)] && !(IsUpper(v) && sb['+']) {
			Printf("%c", v)
		}
	}
}
