#pragma once
#include <string>

class Report
{
    public:
        virtual void process(std::string&) = 0;
        virtual bool write(std::string) = 0;
        
        int tally = 0;
};