package main

import (
	"bufio"
	. "fmt"
	"os"
)

var awin [3]int // AwinC,AwinJ,AwinB,BwinC,BwinJ,BwinB,Draw
var bwin [3]int
var Draw int

func judge(a, b string) {
	if a == b {
		Draw++
		return
	}
	if a == "C" {
		if b == "B" {
			bwin[2]++
		} else {
			awin[0]++
		}
		return
	}
	if a == "J" {
		if b == "C" {
			bwin[0]++
		} else {
			awin[1]++
		}
		return
	}
	if a == "B" {
		if b == "C" {
			awin[2]++
		} else {
			bwin[1]++
		}
		return
	}

}

func main() {
	T := 0
	Scanf("%d", &T)
	Reader := bufio.NewReader(os.Stdin)
	for i := 0; i < T; i++ {
		input, _ := Reader.ReadString('\n')
		judge(Sprintf("%c", input[0]), Sprintf("%c", input[2]))
	}
	Awin := awin[0] + awin[1] + awin[2]
	Bwin := bwin[0] + bwin[1] + bwin[2]
	Printf("%d %d %d\n", Awin, Draw, Bwin)
	Printf("%d %d %d\n", Bwin, Draw, Awin)
	if awin[2] >= awin[0] && awin[2] >= awin[1] {
		Printf("B ")
	} else if awin[0] >= awin[1] && awin[0] > awin[2] {
		Printf("C ")
	} else {
		Printf("J ")
	}
	if bwin[2] >= bwin[0] && bwin[2] >= bwin[1] {
		Printf("B")
	} else if bwin[0] >= bwin[1] && bwin[0] > bwin[2] {
		Printf("C")
	} else {
		Printf("J")
	}
}
