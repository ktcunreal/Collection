package main

import (
	. "fmt"
	"math"
)

func main() {
	var C1, C2 float32
	Scanf("%f%f", &C1, &C2)
	n := int(math.Floor(float64(0.5 + (C2-C1)/100)))
	Printf("%02d:%02d:%02d", n/3600, n%3600/60, n%3600%60)
}
