#pragma once
#include <fstream>

#include "report.hpp"

class Count : public Report
{
    public:
        void process(std::string&line)
        {
            this->tally++;
        }

        bool write(std::string inFile)
        {
            std::ofstream out(inFile+".readCount");

            if(out.bad())
                return false;

            out<<this->tally;

            return true;
        }
};