#1 Write a program that checks to see if the given number appears in the given array. 
arr = [1,3,5,7,9,11]
number = 3

if arr.index(number)
  puts "Is #{number} in the array?"
  puts true
end

#2 Write a program that takes a number from the user between 0 and 100 and reports back whether the number is between 0 and 50, 51 and 100, or above 100.
puts "Type a number between 0 and 100 below:"
x = gets.chomp.to_i

case x
  when 0...50
    puts "#{x} is between 0 and 50"
  when 51...100
    puts "#{x} is between 51 and 100"
  when input > 100
    puts "#{x} is more than 100"
  else
    puts "#{x} is less than 0"
end

#3 Write a while loop that takes input from the user, performs an action, and only stops when the user types "STOP". Each loop can get info from the user.
puts "Type anything below:"
x = gets.chomp

while x != "STOP"
    puts "Keep typing.."
    x = gets.chomp
end

#4 Write a program that checks to see if the number in the given array is divisible by 2 and store them into a new array.
arr = [6, 3, 1, 8, 4, 2, 10, 65, 102]
newArr = []

arr.each do |i|
  if i % 2 == 0
    newArr.push(i)
  end
end

puts newArr



