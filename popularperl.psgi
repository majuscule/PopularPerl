use strict;
use warnings;

use PopularPerl;

my $app = PopularPerl->apply_default_middlewares(PopularPerl->psgi_app);
$app;

