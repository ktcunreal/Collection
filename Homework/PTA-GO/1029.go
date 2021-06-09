package main

import (
	"bufio"
	. "fmt"
	"os"
	. "strings"
)

func main() {
	var exclude = make(map[string]bool, 60)
	input := bufio.NewScanner(os.Stdin)
	input.Scan()
	raw := ToUpper(input.Text())
	input.Scan()
	o := ToUpper(input.Text())
	for i, _ := range raw {
		if !Contains(o, raw[i:i+1]) && !exclude[raw[i:i+1]] {
			Printf("%s", raw[i:i+1])
			exclude[raw[i:i+1]] = true
		}
	}
}
