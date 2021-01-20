#4 Write a program called age.rb that asks a user how old they are and then tells them how old they will be in 10, 20, 30 and 40 years. Below is the output for someone 20 years old.
def age_count (*year)
    puts "How old are you?"
    for i in 0...year.length # loop all values starting from first value
        puts "In #{year[i]} years you will be:"
        puts year[i] + 20
    end
end

age_count 10, 20, 30, 40
