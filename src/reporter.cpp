#include "lib/processSam.hpp"

int main(int argc,char*argv[])
{
    if(!processSam(argv[1]))
        return 1;
    return 0;
}

