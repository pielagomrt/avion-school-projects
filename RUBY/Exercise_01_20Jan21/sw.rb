#1 Use the each method of Array to iterate over [1,2,3,4,5,6,7,8,9,10] and print out each value.
[1,2,3,4,5,6,7,8,9,10].each do |i|
    puts i 
end

#2 Suppose you have hash h = {a:1, b:2, c:3, d:4}. (a) Get the value of key :b. (b) Add to this hash the key:value pair {e:5}.
h = {a:1, b:2, c:3, d:4}
puts h[:b] # (a)
puts h.merge(e:5) # (b)

#3 Given the following data structures, write a program that copies the information from the array into the empty hash that applies to the correct person.
contact_data = [["ana@email.com", "123 Main st.", "555-123-4567"], ["avion@email.com", "404 Not Found Dr.", "123-234-3454"]]
contacts = {"Analyn Cajocson" => {}, "Avion School" => {}}

A = {email: contact_data[0][0], address: contact_data[0][1], phone: contact_data[0][2]}
B = {email: contact_data[1][0], address: contact_data[1][1], phone: contact_data[1][2]}

contacts["Analyn Cajocson"] = A
contacts["Avion School"] = B
puts contacts