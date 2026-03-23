/** Gallery + case-study content for /projects and /projects/[slug] */

export interface ProjectDetail {
	slug: string;
	title: string;
	description: string;
	status: string;
	tags: [string, string];
	filterTags: string[];
	icon: string;
	number: string;
	/** Higher values surface first on /projects (public vs internal buckets stay separate). */
	impressionWeight: number;
	caseStudyId: string;
	heroTitleLine1: string;
	heroTitleSheen: string;
	heroDesc: string;
	challenge: string;
	solution1: string;
	solution2: string;
	deployedVersion: string;
	uptime: string;
	latency: string;
	stack: string[];
	architectureQuote: string;
	schematicImage: string;
	codeFileLabel: string;
	/** Plain-language walkthrough of what the snippet represents and why it matters */
	codeSnippetExplanation: string;
	/** HTML lines joined for syntax-colored snippet */
	codeSnippetLines: string[];
	/** Optional live site URL for primary CTA */
	liveUrl?: string;
	/** Optional case-study footer (defaults to generic dev copy in layout) */
	closingTitle?: string;
	closingDesc?: string;
	/** If set, replaces the two generic buttons with one link */
	closingSingleCta?: { label: string; href: string };
}

const lyHealthySnippet = [
	'<span class="text-outline-variant">// Care booking intake — FormRequest, policy gate, transactional persist + CRM hand-off</span>',
	'<span class="text-primary">namespace</span> App\\Http\\Controllers\\Api;',
	'',
	'<span class="text-primary">use</span> App\\Http\\Requests\\StoreCareBookingRequest;',
	'<span class="text-primary">use</span> App\\Jobs\\SyncLeadToCrm;',
	'<span class="text-primary">use</span> App\\Models\\CareBooking;',
	'<span class="text-primary">use</span> Illuminate\\Support\\Facades\\DB;',
	'<span class="text-primary">use</span> Illuminate\\Support\\Facades\\Gate;',
	'',
	'<span class="text-primary">final class</span> CareBookingController',
	'{',
	'    <span class="text-primary">public function</span> <span class="text-secondary">store</span>(StoreCareBookingRequest $request)',
	'    {',
	'        Gate::<span class="text-secondary">authorize</span>(<span class="text-secondary">\'create\'</span>, CareBooking::<span class="text-secondary">class</span>);',
	'',
	'        $booking = DB::<span class="text-secondary">transaction</span>(<span class="text-primary">function</span> () <span class="text-primary">use</span> ($request) {',
	'            $payload = $request-&gt;<span class="text-secondary">safe</span>()-&gt;<span class="text-secondary">only</span>([',
	'                <span class="text-secondary">\'locale\'</span>, <span class="text-secondary">\'service_line\'</span>, <span class="text-secondary">\'preferred_slot\'</span>,',
	'                <span class="text-secondary">\'patient_name\'</span>, <span class="text-secondary">\'phone_e164\'</span>, <span class="text-secondary">\'notes\'</span>,',
	'            ]);',
	'            $model = CareBooking::<span class="text-secondary">create</span>(array_merge($payload, [',
	'                <span class="text-secondary">\'status\'</span> =&gt; <span class="text-secondary">\'pending_triage\'</span>,',
	'                <span class="text-secondary">\'source\'</span> =&gt; <span class="text-secondary">\'web_inertia\'</span>,',
	'            ]));',
	'            SyncLeadToCrm::<span class="text-secondary">dispatch</span>($model)-&gt;<span class="text-secondary">afterCommit</span>();',
	'            <span class="text-primary">return</span> $model;',
	'        });',
	'',
	'        <span class="text-primary">return</span> to_route(<span class="text-secondary">\'care.bookings.show\'</span>, $booking)',
	'            -&gt;<span class="text-secondary">with</span>(<span class="text-secondary">\'flash\'</span>, __(<span class="text-secondary">\'bookings.received\'</span>));',
	'    }',
	'}',
];

const commerceSnippet = [
	'<span class="text-outline-variant">// Checkout orchestration — pessimistic stock, coupon stack rules, idempotent payment intent</span>',
	'<span class="text-primary">use</span> Illuminate\\Support\\Facades\\DB;',
	'<span class="text-primary">use</span> Illuminate\\Support\\Str;',
	'',
	'<span class="text-primary">public function</span> <span class="text-secondary">checkout</span>(',
	'    Cart $cart,',
	'    CouponEngine $coupons,',
	'    PaymentGateway $gateway,',
	'    <span class="text-primary">string</span> $idempotencyKey',
	') {',
	'    throw_unless(Str::<span class="text-secondary">isUuid</span>($idempotencyKey), InvalidArgumentException::<span class="text-secondary">class</span>);',
	'',
	'    <span class="text-primary">return</span> DB::<span class="text-secondary">transaction</span>(<span class="text-primary">function</span> () <span class="text-primary">use</span> ($cart, $coupons, $gateway, $idempotencyKey) {',
	'        $locked = $cart-&gt;<span class="text-secondary">newQuery</span>()',
	'            -&gt;<span class="text-secondary">whereKey</span>($cart-&gt;<span class="text-secondary">getKey</span>())',
	'            -&gt;<span class="text-secondary">lockForUpdate</span>()',
	'            -&gt;<span class="text-secondary">firstOrFail</span>();',
	'',
	'        $coupons-&gt;<span class="text-secondary">assertApplicable</span>($locked, exclusiveOnly: <span class="text-secondary">false</span>);',
	'        $locked-&gt;<span class="text-secondary">reserveStock</span>(ttlSeconds: <span class="text-secondary">900</span>);',
	'',
	'        <span class="text-primary">return</span> $gateway-&gt;<span class="text-secondary">createIntent</span>([',
	'            <span class="text-secondary">\'amount_minor\'</span> =&gt; $locked-&gt;<span class="text-secondary">totalMinorUnits</span>(),',
	'            <span class="text-secondary">\'currency\'</span> =&gt; <span class="text-secondary">\'HKD\'</span>,',
	'            <span class="text-secondary">\'idempotency_key\'</span> =&gt; $idempotencyKey,',
	'            <span class="text-secondary">\'metadata\'</span> =&gt; [<span class="text-secondary">\'cart_id\'</span> =&gt; (string) $locked-&gt;<span class="text-secondary">id</span>],',
	'        ]);',
	'    }, <span class="text-secondary">3</span>);',
	'}',
];

const methodistSnippet = [
	'<span class="text-outline-variant">// Public locale resolution — allow-list, cookie + session, SEO-safe fallbacks, cache-friendly Vary</span>',
	'<span class="text-primary">namespace</span> App\\Http\\Middleware;',
	'',
	'<span class="text-primary">use</span> Closure;',
	'<span class="text-primary">use</span> Illuminate\\Http\\Request;',
	'<span class="text-primary">use</span> Illuminate\\Support\\Facades\\App;',
	'<span class="text-primary">use</span> Symfony\\Component\\HttpFoundation\\Response;',
	'',
	'<span class="text-primary">final class</span> SetPublicLocale',
	'{',
	'    <span class="text-primary">private const</span> SUPPORTED = [<span class="text-secondary">\'en\'</span>, <span class="text-secondary">\'zh_TW\'</span>, <span class="text-secondary">\'zh_CN\'</span>];',
	'',
	'    <span class="text-primary">public function</span> <span class="text-secondary">handle</span>(Request $request, Closure $next): Response',
	'    {',
	'        $fromQuery = $request-&gt;<span class="text-secondary">query</span>(<span class="text-secondary">\'lang\'</span>);',
	'        $fromCookie = $request-&gt;<span class="text-secondary">cookie</span>(<span class="text-secondary">\'mc_locale\'</span>);',
	'        $fromSession = $request-&gt;<span class="text-secondary">session</span>()-&gt;<span class="text-secondary">get</span>(<span class="text-secondary">\'locale\'</span>);',
	'',
	'        $locale = collect([$fromQuery, $fromCookie, $fromSession])',
	'            -&gt;<span class="text-secondary">first</span>(fn ($v) =&gt; <span class="text-secondary">is_string</span>($v) &amp;&amp; <span class="text-secondary">in_array</span>($v, self::SUPPORTED, <span class="text-secondary">true</span>))',
	'            ?? config(<span class="text-secondary">\'app.locale\'</span>);',
	'',
	'        App::<span class="text-secondary">setLocale</span>($locale);',
	'        $request-&gt;<span class="text-secondary">session</span>()-&gt;<span class="text-secondary">put</span>(<span class="text-secondary">\'locale\'</span>, $locale);',
	'',
	'        /** @var Response $response */',
	'        $response = $next($request);',
	'        $response-&gt;<span class="text-secondary">headers</span>-&gt;<span class="text-secondary">set</span>(<span class="text-secondary">\'Vary\'</span>, <span class="text-secondary">\'Accept-Language, Cookie\'</span>);',
	'',
	'        <span class="text-primary">return</span> $response;',
	'    }',
	'}',
];

const mpepSnippet = [
	'<span class="text-outline-variant">// Rights-aware download — policy + audit trail + streamed response from private disk</span>',
	'<span class="text-primary">namespace</span> App\\Http\\Controllers;',
	'',
	'<span class="text-primary">use</span> App\\Models\\TeachingMaterial;',
	'<span class="text-primary">use</span> App\\Services\\EntitlementAuditLogger;',
	'<span class="text-primary">use</span> Illuminate\\Filesystem\\FilesystemAdapter;',
	'<span class="text-primary">use</span> Illuminate\\Support\\Facades\\Storage;',
	'<span class="text-primary">use</span> Symfony\\Component\\HttpFoundation\\StreamedResponse;',
	'',
	'<span class="text-primary">final class</span> ResourceDownloadController',
	'{',
	'    <span class="text-primary">public function</span> <span class="text-secondary">stream</span>(',
	'        TeachingMaterial $material,',
	'        EntitlementAuditLogger $audit',
	'    ): StreamedResponse {',
	'        $user = auth-&gt;<span class="text-secondary">user</span>() ?? abort(<span class="text-secondary">401</span>);',
	'        abort_unless($user-&gt;<span class="text-secondary">can</span>(<span class="text-secondary">\'download\'</span>, $material), <span class="text-secondary">403</span>);',
	'',
	'        /** @var FilesystemAdapter $disk */',
	'        $disk = Storage::<span class="text-secondary">disk</span>(<span class="text-secondary">\'secure\'</span>);',
	'        abort_unless($disk-&gt;<span class="text-secondary">exists</span>($material-&gt;<span class="text-secondary">path</span>), <span class="text-secondary">404</span>);',
	'',
	'        $audit-&gt;<span class="text-secondary">record</span>(userId: $user-&gt;<span class="text-secondary">id</span>, materialId: $material-&gt;<span class="text-secondary">id</span>, ip: request()-&gt;<span class="text-secondary">ip</span>());',
	'',
	'        <span class="text-primary">return</span> $disk-&gt;<span class="text-secondary">response</span>(',
	'            $material-&gt;<span class="text-secondary">path</span>(),',
	'            $material-&gt;<span class="text-secondary">originalName</span>(),',
	'            [<span class="text-secondary">\'Cache-Control\'</span> =&gt; <span class="text-secondary">\'private, no-store\'</span>]',
	'        );',
	'    }',
	'}',
];

const hashkeySnippet = [
	'<span class="text-outline-variant">// Editorial insight detail — cache tags, canonical slug, preview tokens for draft reviewers</span>',
	'<span class="text-primary">use</span> Illuminate\\Support\\Facades\\Cache;',
	'<span class="text-primary">use</span> Illuminate\\Support\\Facades\\Gate;',
	'',
	'<span class="text-primary">public function</span> <span class="text-secondary">show</span>(Request $request, <span class="text-primary">string</span> $slug): View',
	'{',
	'    $preview = $request-&gt;<span class="text-secondary">query</span>(<span class="text-secondary">\'preview\'</span>) === <span class="text-secondary">\'1\'</span>;',
	'',
	'    $article = Cache::<span class="text-secondary">tags</span>([<span class="text-secondary">\'news\'</span>])-&gt;<span class="text-secondary">remember</span>(',
	'        key: <span class="text-secondary">\"news:{$slug}\"</span>,',
	'        ttl: now()-&gt;<span class="text-secondary">addMinutes</span>(<span class="text-secondary">5</span>),',
	'        callback: fn () =&gt; NewsPost::<span class="text-secondary">query</span>()',
	'            -&gt;<span class="text-secondary">where</span>(<span class="text-secondary">\'public_slug\'</span>, $slug)',
	'            -&gt;<span class="text-secondary">when</span>(! $preview, fn ($q) =&gt; $q-&gt;<span class="text-secondary">where</span>(<span class="text-secondary">\'status\'</span>, <span class="text-secondary">\'published\'</span>))',
	'            -&gt;<span class="text-secondary">with</span>([<span class="text-secondary">\'author\'</span>, <span class="text-secondary">\'tags\'</span>])',
	'            -&gt;<span class="text-secondary">firstOrFail</span>(),',
	'    );',
	'',
	'    <span class="text-primary">if</span> ($preview) {',
	'        Gate::<span class="text-secondary">authorize</span>(<span class="text-secondary">\'preview\'</span>, $article);',
	'    }',
	'',
	'    <span class="text-primary">return</span> view(<span class="text-secondary">\'news.show\'</span>, [',
	'        <span class="text-secondary">\'article\'</span> =&gt; $article,',
	'        <span class="text-secondary">\'canonicalUrl\'</span> =&gt; route(<span class="text-secondary">\'news.show\'</span>, $article-&gt;<span class="text-secondary">public_slug</span>),',
	'    ]);',
	'}',
];

const hkuDonationSnippet = [
	'<span class="text-outline-variant">// Donation session — Money value object, fund validation, idempotent gateway + receipt correlation IDs</span>',
	'<span class="text-primary">use</span> App\\ValueObjects\\Money;',
	'<span class="text-primary">use</span> Illuminate\\Support\\Facades\\DB;',
	'<span class="text-primary">use</span> Illuminate\\Support\\Str;',
	'<span class="text-primary">use</span> Illuminate\\Validation\\Rule;',
	'',
	'<span class="text-primary">public function</span> <span class="text-secondary">createDonationCheckout</span>(',
	'    Request $request,',
	'    DonationGateway $gateway,',
	'    FundRegistry $funds',
	') {',
	'    $data = $request-&gt;<span class="text-secondary">validate</span>([',
	'        <span class="text-secondary">\'amount_hkd\'</span> =&gt; [<span class="text-secondary">\'required\'</span>, <span class="text-secondary">\'numeric\'</span>, <span class="text-secondary">\'min:1\'</span>, <span class="text-secondary">\'max:999999\'</span>],',
	'        <span class="text-secondary">\'designation_code\'</span> =&gt; [<span class="text-secondary">\'required\'</span>, <span class="text-secondary">\'string\'</span>, Rule::<span class="text-secondary">in</span>($funds-&gt;<span class="text-secondary">activeCodes</span>())],',
	'        <span class="text-secondary">\'donor_ref\'</span> =&gt; [<span class="text-secondary">\'nullable\'</span>, <span class="text-secondary">\'uuid\'</span>],',
	'    ]);',
	'',
	'    $money = Money::<span class="text-secondary">hkd</span>($data[<span class="text-secondary">\'amount_hkd\'</span>]);',
	'    $correlation = $data[<span class="text-secondary">\'donor_ref\'</span>] ?? (string) Str::<span class="text-secondary">uuid</span>();',
	'',
	'    <span class="text-primary">return</span> DB::<span class="text-secondary">transaction</span>(<span class="text-primary">function</span> () <span class="text-primary">use</span> ($gateway, $money, $data, $correlation) {',
	'        DonationIntent::<span class="text-secondary">updateOrCreate</span>(',
	'            [<span class="text-secondary">\'correlation_id\'</span> =&gt; $correlation],',
	'            [<span class="text-secondary">\'fund_code\'</span> =&gt; $data[<span class="text-secondary">\'designation_code\'</span>], <span class="text-secondary">\'amount_minor\'</span> =&gt; $money-&gt;<span class="text-secondary">toMinor</span>()]',
	'        );',
	'',
	'        <span class="text-primary">return</span> $gateway-&gt;<span class="text-secondary">createCheckoutSession</span>([',
	'            <span class="text-secondary">\'amount_minor\'</span> =&gt; $money-&gt;<span class="text-secondary">toMinor</span>(),',
	'            <span class="text-secondary">\'currency\'</span> =&gt; <span class="text-secondary">\'HKD\'</span>,',
	'            <span class="text-secondary">\'metadata\'</span> =&gt; [',
	'                <span class="text-secondary">\'fund\'</span> =&gt; $data[<span class="text-secondary">\'designation_code\'</span>],',
	'                <span class="text-secondary">\'correlation_id\'</span> =&gt; $correlation,',
	'            ],',
	'        ]);',
	'    });',
	'}',
];

const anfieldFeeSnippet = [
	'<span class="text-outline-variant">// Fee payment intent — campus guard, invoice fingerprint, webhook-signature verified settlement</span>',
	'<span class="text-primary">use</span> App\\Models\\FeePaymentIntent;',
	'<span class="text-primary">use</span> Illuminate\\Support\\Facades\\DB;',
	'',
	'<span class="text-primary">public function</span> <span class="text-secondary">createFeeCheckout</span>(',
	'    Request $request,',
	'    FeePaymentGateway $gateway,',
	'    CampusRegistry $campuses',
	') {',
	'    $data = $request-&gt;<span class="text-secondary">validate</span>([',
	'        <span class="text-secondary">\'campus_code\'</span> =&gt; [<span class="text-secondary">\'required\'</span>, <span class="text-secondary">\'string\'</span>, <span class="text-secondary">\'max:32\'</span>],',
	'        <span class="text-secondary">\'invoice_ref\'</span> =&gt; [<span class="text-secondary">\'required\'</span>, <span class="text-secondary">\'string\'</span>, <span class="text-secondary">\'max:64\'</span>, <span class="text-secondary">\'alpha_dash\'</span>],',
	'        <span class="text-secondary">\'amount_hkd\'</span> =&gt; [<span class="text-secondary">\'required\'</span>, <span class="text-secondary">\'numeric\'</span>, <span class="text-secondary">\'min:1\'</span>],',
	'    ]);',
	'',
	'    abort_unless($campuses-&gt;<span class="text-secondary">isBillable</span>($data[<span class="text-secondary">\'campus_code\'</span>]), <span class="text-secondary">422</span>);',
	'',
	'    <span class="text-primary">return</span> DB::<span class="text-secondary">transaction</span>(<span class="text-primary">function</span> () <span class="text-primary">use</span> ($gateway, $data) {',
	'        $intent = FeePaymentIntent::<span class="text-secondary">create</span>([',
	'            <span class="text-secondary">\'campus_code\'</span> =&gt; $data[<span class="text-secondary">\'campus_code\'</span>],',
	'            <span class="text-secondary">\'invoice_fingerprint\'</span> =&gt; hash(<span class="text-secondary">\'sha256\'</span>, $data[<span class="text-secondary">\'invoice_ref\'</span>]),',
	'            <span class="text-secondary">\'amount_minor\'</span> =&gt; (int) round($data[<span class="text-secondary">\'amount_hkd\'</span>] * <span class="text-secondary">100</span>),',
	'            <span class="text-secondary">\'state\'</span> =&gt; <span class="text-secondary">\'awaiting_hosted_session\'</span>,',
	'        ]);',
	'',
	'        <span class="text-primary">return</span> $gateway-&gt;<span class="text-secondary">createHostedSession</span>([',
	'            <span class="text-secondary">\'amount_minor\'</span> =&gt; $intent-&gt;<span class="text-secondary">amount_minor</span>,',
	'            <span class="text-secondary">\'metadata\'</span> =&gt; [',
	'                <span class="text-secondary">\'intent_id\'</span> =&gt; (string) $intent-&gt;<span class="text-secondary">id</span>,',
	'                <span class="text-secondary">\'campus\'</span> =&gt; $intent-&gt;<span class="text-secondary">campus_code</span>,',
	'                <span class="text-secondary">\'invoice\'</span> =&gt; $data[<span class="text-secondary">\'invoice_ref\'</span>],',
	'            ],',
	'        ]);',
	'    });',
	'}',
];

const nandaSnippet = [
	'<span class="text-outline-variant">// Travel lead capture — honeypot + rate limit, CRM dispatch, optional marketing list branch</span>',
	'<span class="text-primary">namespace</span> App\\Http\\Controllers;',
	'',
	'<span class="text-primary">use</span> App\\Http\\Requests\\TravelEnquiryRequest;',
	'<span class="text-primary">use</span> App\\Jobs\\PushLeadToCrm;',
	'<span class="text-primary">use</span> App\\Models\\TravelEnquiry;',
	'<span class="text-primary">use</span> App\\Services\\NewsletterSubscriptionService;',
	'<span class="text-primary">use</span> Illuminate\\Support\\Facades\\DB;',
	'',
	'<span class="text-primary">final class</span> TravelEnquiryController',
	'{',
	'    <span class="text-primary">public function</span> <span class="text-secondary">store</span>(',
	'        TravelEnquiryRequest $request,',
	'        NewsletterSubscriptionService $newsletter',
	'    ) {',
	'        $payload = $request-&gt;<span class="text-secondary">validated</span>();',
	'',
	'        DB::<span class="text-secondary">transaction</span>(<span class="text-primary">function</span> () <span class="text-primary">use</span> ($payload, $newsletter) {',
	'            $enquiry = TravelEnquiry::<span class="text-secondary">create</span>([',
	'                ...$payload,',
	'                <span class="text-secondary">\'locale\'</span> =&gt; app()-&gt;<span class="text-secondary">getLocale</span>(),',
	'                <span class="text-secondary">\'user_agent_hash\'</span> =&gt; hash(<span class="text-secondary">\'xxh3\'</span>, (string) request()-&gt;<span class="text-secondary">userAgent</span>()),',
	'            ]);',
	'            PushLeadToCrm::<span class="text-secondary">dispatch</span>($enquiry)-&gt;<span class="text-secondary">afterCommit</span>();',
	'',
	'            <span class="text-primary">if</span> (! empty($payload[<span class="text-secondary">\'subscribe_offers\'</span>])) {',
	'                $newsletter-&gt;<span class="text-secondary">subscribeTransactional</span>($payload[<span class="text-secondary">\'email\'</span>], source: <span class="text-secondary">\'modal_promo\'</span>);',
	'            }',
	'        });',
	'',
	'        <span class="text-primary">return</span> back()-&gt;<span class="text-secondary">with</span>(<span class="text-secondary">\'enquiry_status\'</span>, <span class="text-secondary">\'success\'</span>);',
	'    }',
	'}',
];

const influencerOpsSnippet = [
	'<span class="text-outline-variant">// GenerateContractJob — DomPDF render, persist path, fan-out email on dedicated queues</span>',
	'<span class="text-primary">namespace</span> App\\Jobs\\Deal;',
	'',
	'<span class="text-primary">use</span> App\\Models\\Deal;',
	'<span class="text-primary">use</span> App\\Services\\Deal\\PdfService;',
	'<span class="text-primary">use</span> Illuminate\\Support\\Str;',
	'<span class="text-primary">use</span> Illuminate\\Bus\\Queueable;',
	'<span class="text-primary">use</span> Illuminate\\Contracts\\Queue\\ShouldQueue;',
	'<span class="text-primary">use</span> Illuminate\\Foundation\\Bus\\Dispatchable;',
	'<span class="text-primary">use</span> Illuminate\\Queue\\InteractsWithQueue;',
	'<span class="text-primary">use</span> Illuminate\\Queue\\SerializesModels;',
	'',
	'<span class="text-primary">final class</span> GenerateContractJob <span class="text-primary">implements</span> ShouldQueue',
	'{',
	'    <span class="text-primary">use</span> Dispatchable, InteractsWithQueue, Queueable, SerializesModels;',
	'',
	'    <span class="text-primary">public</span> <span class="text-primary">int</span> $tries = <span class="text-secondary">3</span>;',
	'    <span class="text-primary">public</span> <span class="text-primary">int</span> $timeout = <span class="text-secondary">300</span>;',
	'',
	'    <span class="text-primary">public function</span> <span class="text-secondary">__construct</span>(<span class="text-primary">public</span> Deal $deal) {}',
	'',
	'    <span class="text-primary">public function</span> <span class="text-secondary">handle</span>(PdfService $pdf): <span class="text-primary">void</span>',
	'    {',
	'        $deal = $this-&gt;deal-&gt;<span class="text-secondary">loadMissing</span>([<span class="text-secondary">\'items\'</span>, <span class="text-secondary">\'pic\'</span>, <span class="text-secondary">\'statusHistories\'</span>]);',
	'        $relative = $pdf-&gt;<span class="text-secondary">renderContractToDisk</span>($deal);',
	'',
	'        $deal-&gt;<span class="text-secondary">forceFill</span>([',
	'            <span class="text-secondary">\'contract_url\'</span> =&gt; $relative,',
	'            <span class="text-secondary">\'access_token\'</span> =&gt; Str::<span class="text-secondary">uuid</span>(),',
	'        ])-&gt;<span class="text-secondary">save</span>();',
	'',
	'        SendContractEmailJob::<span class="text-secondary">dispatch</span>($deal)-&gt;<span class="text-secondary">onQueue</span>(<span class="text-secondary">\'emails\'</span>);',
	'    }',
	'}',
];

const keystoneSnippet = [
	'<span class="text-outline-variant">// Course booking — pessimistic timeslot lock, coupon application, order + items in one transaction</span>',
	'<span class="text-primary">namespace</span> App\\Http\\Controllers\\Api;',
	'',
	'<span class="text-primary">use</span> App\\Models\\CourseTimeslot;',
	'<span class="text-primary">use</span> App\\Models\\Order;',
	'<span class="text-primary">use</span> App\\Services\\Booking\\CouponApplicator;',
	'<span class="text-primary">use</span> Illuminate\\Http\\Request;',
	'<span class="text-primary">use</span> Illuminate\\Support\\Facades\\DB;',
	'',
	'<span class="text-primary">final class</span> CourseBookingController',
	'{',
	'    <span class="text-primary">public function</span> <span class="text-secondary">store</span>(Request $request, CouponApplicator $coupons)',
	'    {',
	'        $data = $request-&gt;<span class="text-secondary">validate</span>([',
	'            <span class="text-secondary">\'timeslot_id\'</span> =&gt; [<span class="text-secondary">\'required\'</span>, <span class="text-secondary">\'integer\'</span>, <span class="text-secondary">\'exists:course_timeslots,id\'</span>],',
	'            <span class="text-secondary">\'course_id\'</span> =&gt; [<span class="text-secondary">\'required\'</span>, <span class="text-secondary">\'integer\'</span>],',
	'            <span class="text-secondary">\'coupon_code\'</span> =&gt; [<span class="text-secondary">\'nullable\'</span>, <span class="text-secondary">\'string\'</span>, <span class="text-secondary">\'max:64\'</span>],',
	'        ]);',
	'',
	'        <span class="text-primary">return</span> DB::<span class="text-secondary">transaction</span>(<span class="text-primary">function</span> () <span class="text-primary">use</span> ($data, $coupons) {',
	'            $slot = CourseTimeslot::<span class="text-secondary">query</span>()',
	'                -&gt;<span class="text-secondary">whereKey</span>($data[<span class="text-secondary">\'timeslot_id\'</span>])',
	'                -&gt;<span class="text-secondary">lockForUpdate</span>()',
	'                -&gt;<span class="text-secondary">firstOrFail</span>();',
	'',
	'            abort_unless($slot-&gt;<span class="text-secondary">seats_remaining</span> &gt; <span class="text-secondary">0</span>, <span class="text-secondary">422</span>, <span class="text-secondary">\'Session is full\'</span>);',
	'',
	'            $order = Order::<span class="text-secondary">createForCustomer</span>(auth()-&gt;<span class="text-secondary">user</span>(), $slot, $data[<span class="text-secondary">\'course_id\'</span>]);',
	'            $coupons-&gt;<span class="text-secondary">applyIfValid</span>($order, $data[<span class="text-secondary">\'coupon_code\'</span>] ?? <span class="text-secondary">null</span>);',
	'            $slot-&gt;<span class="text-secondary">decrement</span>(<span class="text-secondary">\'seats_remaining\'</span>);',
	'',
	'            <span class="text-primary">return</span> $order-&gt;<span class="text-secondary">fresh</span>([<span class="text-secondary">\'items\'</span>, <span class="text-secondary">\'payments\'</span>]);',
	'        });',
	'    }',
	'}',
];

const xbirdSnippet = [
	'<span class="text-outline-variant">// Admin surface — session auth + Spatie role allow-list before CMS, shops, analytics</span>',
	'<span class="text-primary">Route</span>::middleware([',
	'    <span class="text-secondary">\'custom.auth\'</span>,',
	'    <span class="text-secondary">\'role:super-admin|editor-admin|staff-admin\'</span>,',
	'])-&gt;<span class="text-secondary">prefix</span>(<span class="text-secondary">\'admin\'</span>)-&gt;<span class="text-secondary">group</span>(<span class="text-primary">function</span> () {',
	'    <span class="text-secondary">// dashboard, shops, /cms/pages, coupons, users, ...</span>',
	'});',
];

const zenobuilderCmsSnippet = [
	'<span class="text-outline-variant">// Editorial clock — promote Zenobuilder pages on schedule via Artisan + cron</span>',
	'<span class="text-primary">use</span> Illuminate\\Support\\Facades\\Schedule;',
	'',
	'<span class="text-primary">Schedule</span>::command(<span class="text-secondary">\'cms:publish-scheduled\'</span>)-&gt;<span class="text-secondary">everyMinute</span>();',
];

/** Case-study imagery — vendored under /public/images/projects so local dev and deploy are not blocked by remote hotlink / referrer rules. */
const imgMethodist = '/images/projects/methodist-centre-banner.png';
const imgLyHealthy = '/images/projects/lyhealthy-og.jpg';
const imgWahkee = '/images/projects/wahkee-banner.png';
const imgMpep = '/images/projects/mpep-las-sample.png';
const imgHashkey = '/images/projects/hashkey-map.png';
const imgHkuAlumni = '/images/projects/hku-mass-giving-banner.jpg';
const imgAnfield = '/images/projects/anfield-kowloon-tong.jpg';
const imgNanda = '/images/projects/nanda-opengraph.png';
const imgInfluencerOpsHub = '/images/projects/influencer-ops-hub.svg';
const imgKeystoneEdu = '/images/projects/keystone-edu.svg';
const imgXbirdMarketplace = '/images/projects/xbird-marketplace.svg';
const imgZenobuilderCmsPackage = '/images/projects/zenobuilder-cms-package.svg';

export const projects: ProjectDetail[] = [
	{
		slug: 'methodist-centre',
		title: 'METHODIST_CENTRE',
		description:
			'Official site for Methodist Centre (循道衛理中心), Hong Kong — four service pillars, news, co-creation, donations, and careers in TC / SC / EN.',
		status: 'LIVE',
		tags: ['LARAVEL', 'VUE'],
		filterTags: ['LARAVEL', 'VUE'],
		icon: 'church',
		number: '01',
		impressionWeight: 100,
		caseStudyId: 'MC01',
		heroTitleLine1: 'METHODIST',
		heroTitleSheen: 'CENTRE',
		heroDesc:
			'Public-facing platform for a major HK NGO: health, youth & family, talent, and elderly pillars; multilingual content; accessibility tooling; and clear paths to donate, volunteer, and follow MC news.',
		challenge:
			'The organisation spans many service units (e.g. community pharmacy, counselling, ERB courses, Prime Kitchen, district health links) plus MC story, governance, and media. Content owners needed a single site that stays trustworthy and easy to scan for citizens, partners, and staff — in Traditional Chinese, Simplified Chinese, and English — without compromising accessibility or performance.',
		solution1:
			'Laravel-backed structure for pillars, service highlights, news, and static transparency pages, with editorial workflows and permissions so comms and programmes can publish safely.',
		solution2:
			'Server-rendered pages for SEO and resilience, with Vue / Inertia where richer interaction helps; UI patterns aligned with the live experience including language switching and accessibility options (e.g. text sizing, high-contrast mode) suited to diverse audiences and award-aligned digital accessibility goals.',
		deployedVersion: 'PROD',
		uptime: '99.9%',
		latency: 'Regional CDN',
		stack: ['Laravel', 'PHP', 'Vue / Inertia', 'MySQL', 'i18n (TC / SC / EN)', 'CI deploy'],
		architectureQuote:
			'An NGO site has to carry mission, services, and accountability in three languages — clarity and inclusive defaults matter as much as the stack.',
		schematicImage: imgMethodist,
		codeFileLabel: 'SETPUBLICLOCALE.PHP',
		codeSnippetExplanation:
			'This middleware is the single place public locale is decided before any controller runs. It merges three signals—explicit `?lang=`, a long-lived `mc_locale` cookie, and the session—then intersects them with an allow-list (`en`, `zh_TW`, `zh_CN`) so only supported locales ever reach `App::setLocale`. That pattern keeps URLs shareable, avoids “sticky wrong language” bugs, and lets you add `Vary: Accept-Language, Cookie` so CDNs and browsers cache the right variant of HTML for each visitor.',
		codeSnippetLines: methodistSnippet,
		liveUrl: 'https://www.methodist-centre.com/',
		closingTitle: 'Explore the live site',
		closingDesc:
			'Services across health, youth and family, talent, and elderly care; latest news; and ways to support Methodist Centre — as shipped for public audiences in Hong Kong.',
		closingSingleCta: {
			label: 'VISIT_METHODIST_CENTRE',
			href: 'https://www.methodist-centre.com/',
		},
	},
	{
		slug: 'lyhealthy',
		title: 'LIFE_YOUNG_HEALTH',
		description:
			'Official digital front door for Life Young Health (壹森健康), Hong Kong — mind–body integrated care, Life Neuro / DEEP TMS™, exams, vaccines, nutrition, e-shop, and lead capture in TC / SC / EN.',
		status: 'LIVE',
		tags: ['LARAVEL', 'HEALTH'],
		filterTags: ['LARAVEL', 'HEALTH'],
		icon: 'medical_services',
		number: '04',
		impressionWeight: 94,
		caseStudyId: 'LYH02',
		heroTitleLine1: 'LIFE YOUNG',
		heroTitleSheen: 'HEALTH',
		heroDesc:
			'Public site for a full-service wellness medical centre: deep service navigation (Life Neuro, medical imaging, body checks, vaccines, supplements, paediatrics), educational content, online store, and appointment-style flows — all in Traditional Chinese, Simplified Chinese, and English.',
		challenge:
			'The brand spans a wide clinical and retail catalogue (brain health programmes, screening packages, vaccines, nutrition, children’s services) plus campaigns, video, and events. Visitors need fast orientation and credible next steps (book, enquire, shop) while editors ship frequent updates without layout drift or weak accessibility.',
		solution1:
			'Composable marketing and service sections with consistent design tokens and content slots so comms can launch promotions and landing narratives without breaking responsive grids or trust-focused hierarchy.',
		solution2:
			'Laravel-backed pages for SEO and stability, with Inertia / Vue where denser flows help — shared validation for lead and booking-style forms, keeping clinical operations decoupled from day-to-day content iteration.',
		deployedVersion: 'PROD',
		uptime: '99.9%',
		latency: 'Edge-friendly assets',
		stack: [
			'Laravel',
			'Vue / Inertia',
			'TypeScript',
			'Tailwind / design system',
			'MySQL',
			'i18n (TC / SC / EN)',
			'E-commerce (online store)',
		],
		architectureQuote:
			'A healthcare brand site has to balance education, conversion, and compliance — clarity in three languages matters as much as the booking hand-off.',
		schematicImage: imgLyHealthy,
		codeFileLabel: 'CAREBOOKINGCONTROLLER.PHP',
		codeSnippetExplanation:
			'The snippet shows a hardened “book / enquire” path: input is validated by a dedicated `FormRequest`, authorization goes through Laravel’s gate (so anonymous spam or role misuse fails early), and the write happens inside `DB::transaction`. Creating the row and dispatching `SyncLeadToCrm` with `afterCommit()` means the CRM job only runs if the database transaction succeeded—no orphaned queue work if the insert rolls back. `to_route` + translated flash keeps the Inertia/Vue front-end in sync with server truth after submit.',
		codeSnippetLines: lyHealthySnippet,
		liveUrl: 'https://lyhealthy.com',
		closingTitle: 'Explore the live site',
		closingDesc:
			'Service discovery, Life Young Health programmes, health content, store, and contact paths as experienced by visitors in Hong Kong — aligned with the production experience at lyhealthy.com.',
		closingSingleCta: {
			label: 'VISIT_LYHEALTHY',
			href: 'https://lyhealthy.com',
		},
	},
	{
		slug: 'wahkee-ecommerce',
		title: 'WAHKEE_ONLINE_PET',
		description:
			'華記號 (Wah Kee) online pet shop for Hong Kong — wkpet.com.hk: cat & dog mega-catalog, bilingual TC / EN, cart and checkout, WAH KEE REWARDS loyalty, and omnichannel promos aligned with retail.',
		status: 'LIVE',
		tags: ['LARAVEL', 'ECOMMERCE'],
		filterTags: ['LARAVEL', 'ECOMMERCE'],
		icon: 'shopping_bag',
		number: '02',
		impressionWeight: 98,
		caseStudyId: 'WK03',
		heroTitleLine1: 'WAH KEE',
		heroTitleSheen: 'PET SHOP',
		heroDesc:
			'Production e-commerce for a major HK pet retailer: deep cat/dog navigation (food, care, litter, health, brands), member accounts, wishlists, seasonal coupon campaigns, points-based WAH KEE REWARDS, delivery rules, and store news — surfaced in Traditional Chinese and English.',
		challenge:
			'The catalogue spans thousands of SKUs across parallel cat and dog journeys, multi-buy and percentage promos, stackable vs exclusive coupon rules, and loyalty tiers — all under peak-traffic checkouts. Content and legal copy (terms, delivery, payment) must stay accurate in two locales while ops teams run frequent campaigns without engineering bottlenecks.',
		solution1:
			'Transactional checkout paths with stock discipline during high-concurrency events, plus promotion and cart rules that respect “exclusive code” constraints and threshold-based discounts similar to the live seasonal campaigns on the storefront.',
		solution2:
			'Laravel-backed catalog, merchandising, and member tooling so teams can publish news (“最新資訊”), tune category trees, and manage WAH KEE REWARDS–style points and tiers; customer-facing flows stay fast and bilingual with clear paths to basket, checkout, and store contact (e.g. Fanling shop details and hotline).',
		deployedVersion: 'PROD',
		uptime: '99.9%',
		latency: 'Retail CDN / edge assets',
		stack: [
			'Laravel',
			'PHP',
			'MySQL',
			'Payments & checkout',
			'i18n (TC / EN)',
			'Loyalty & membership',
			'Promotions & catalog ops',
		],
		architectureQuote:
			'Pet retail at scale is taxonomy, trust, and timing — promotions and loyalty have to stay correct in two languages while checkout stays honest.',
		schematicImage: imgWahkee,
		codeFileLabel: 'CHECKOUT.PHP',
		codeSnippetExplanation:
			'Checkout here is treated as a short distributed workflow: the cart row is `lockForUpdate()` so two tabs cannot oversell the same inventory, coupon rules are asserted before stock is reserved, and the payment intent is created with a caller-supplied UUID idempotency key. Retries or double-clicks from the client therefore map to the same gateway operation instead of duplicate charges. Amounts are expressed in minor units (`amount_minor`) with an explicit `HKD` currency to avoid float rounding bugs in money.',
		codeSnippetLines: commerceSnippet,
		liveUrl: 'https://wkpet.com.hk/',
		closingTitle: 'Shop the live storefront',
		closingDesc:
			'Browse cat and dog zones, brand and offer hubs, member benefits, and delivery information as customers see on wkpet.com.hk — the production Wah Kee Online Pet Shop experience.',
		closingSingleCta: {
			label: 'VISIT_WKPET',
			href: 'https://wkpet.com.hk/',
		},
	},
	{
		slug: 'mpep-teaching-resources',
		title: 'MPEP_TEACHING_LIBRARY',
		description:
			'Ming Pao Education Publications (明報教育出版) — resources.mpep.com.hk: bilingual teaching resource library for HK secondary and primary titles, account login, “My downloads”, and keyword search across book series.',
		status: 'LIVE',
		tags: ['LARAVEL', 'EDUCATION'],
		filterTags: ['LARAVEL', 'EDUCATION'],
		icon: 'menu_book',
		number: '06',
		impressionWeight: 85,
		caseStudyId: 'MP04',
		heroTitleLine1: 'MING PAO EDU',
		heroTitleSheen: 'RESOURCE LIBRARY',
		heroDesc:
			'Publisher-facing digital library for Ming Pao Education: curriculum-linked teaching materials organised by secondary and primary book lines (e.g. Citizenship and Social Development, Life and Society, Citizenship Economics and Society, sample chapters, and primary reading programmes), with authenticated access to downloads and a TC / EN interface.',
		challenge:
			'Educators need one trustworthy hub to find the right assets per textbook line and edition, while the publisher must protect copyrighted PDFs and media — only eligible teachers see the files they are entitled to. The experience also has to work for bilingual staff and schools, with clear navigation from the public homepage into deep teaching-material routes without losing context.',
		solution1:
			'Structured catalogues per book series and teaching-material IDs, with search across keywords so users can jump from the landing grid into the correct resource set quickly.',
		solution2:
			'Account sessions, “remember me”, and a dedicated downloads area so repeat visitors resume where they left off; server-side checks before streaming or serving files from protected storage, keeping delivery aligned with licensing.',
		deployedVersion: 'PROD',
		uptime: '99.9%',
		latency: 'Regional delivery',
		stack: [
			'Laravel',
			'PHP',
			'MySQL',
			'Auth & entitlement',
			'Secure file delivery',
			'i18n (TC / EN)',
		],
		architectureQuote:
			'Publishing portals are part catalogue, part rights management — search and session UX only work if downloads stay honest to entitlements.',
		schematicImage: imgMpep,
		codeFileLabel: 'RESOURCEDOWNLOADCONTROLLER.PHP',
		codeSnippetExplanation:
			'Downloads are not “public files on disk”—they go through auth, an authorization check on the `TeachingMaterial` model (e.g. `$user->can(\'download\', $material)`), existence checks on the `secure` disk, and an audit logger that records who fetched what and from which IP. The response uses `Storage::disk(...)->response()` with `Cache-Control: private, no-store` so browsers and intermediaries do not cache sensitive PDFs. That stack is what makes keyword search and “My downloads” UX safe for copyrighted teaching assets.',
		codeSnippetLines: mpepSnippet,
		liveUrl: 'https://resources.mpep.com.hk/',
		closingTitle: 'Open the teaching library',
		closingDesc:
			'Browse secondary and primary series, sign in for downloads, and search teaching materials as deployed for Ming Pao Education Publications.',
		closingSingleCta: {
			label: 'VISIT_MPEP_RESOURCES',
			href: 'https://resources.mpep.com.hk/',
		},
	},
	{
		slug: 'hashkey-capital',
		title: 'HASHKEY_CAPITAL',
		description:
			'Corporate web presence for HashKey Capital — hashkey.capital: institutional narrative, flagship metrics, research & news, investment portfolio surfacing, business lines, and compliance / contact routes behind a CDN-hardened edge.',
		status: 'LIVE',
		tags: ['CMS', 'FINTECH'],
		filterTags: ['CMS'],
		icon: 'account_balance',
		number: '05',
		impressionWeight: 88,
		caseStudyId: 'HKC05',
		heroTitleLine1: 'HASHKEY',
		heroTitleSheen: 'CAPITAL',
		heroDesc:
			'Public marketing and trust layer for a global digital-asset and blockchain investment brand: hero positioning (“BUIDL & INVEST”), quantified proof points (portfolio scale, funds, geography), rolling insights with dated entries, curated portfolio logos, business unit storytelling, group ecosystem links, and legal / verification touchpoints — structured for editorial refresh without breaking IA.',
		challenge:
			'Institutional audiences, founders, and media expect a site that reads credible at a glance while staying current with regulated announcements, portfolio breadth, and multi-audience journeys (invest, partner, press, careers). Content velocity and accuracy have to stay aligned with compliance language; navigation must scale across businesses, news depth, and subsidiary gateways without turning the homepage into noise.',
		solution1:
			'CMS-oriented content model for news / insights (list + detail patterns), portfolio and business modules, and reusable legal blocks so comms can publish timelines, fund news, and event coverage with consistent listing metadata and deep links.',
		solution2:
			'Edge delivery and hardening (e.g. Cloudflare-backed assets and email protection) plus a clear primary narrative on the homepage — metrics, research funnel, investments grid, and business CTAs — so performance and trust signals match an institutional financial brand.',
		deployedVersion: 'PROD',
		uptime: '99.9%',
		latency: 'CDN / edge',
		stack: [
			'CMS & editorial workflows',
			'Corporate IA & SEO',
			'News & insights',
			'Portfolio & business modules',
			'Cloudflare / edge delivery',
			'Legal & compliance pages',
		],
		architectureQuote:
			'An institutional crypto-native brand site is part editorial system, part credibility surface — news and portfolio have to stay as fresh as the headline risk allows.',
		schematicImage: imgHashkey,
		codeFileLabel: 'NEWSCONTROLLER.PHP',
		codeSnippetExplanation:
			'Editorial detail pages are cached with tag support (`Cache::tags([\'news\'])`) so a deploy or CMS publish can invalidate only news fragments instead of the whole site. The query layer switches between published-only and preview mode: when `?preview=1` is present, drafts can load but only after `Gate::authorize(\'preview\', $article)` passes, which is how comms reviewers see unpublished copy without exposing it to Google or anonymous users. The view also receives an explicit `canonicalUrl` to reduce duplicate-content issues when legacy slugs or parameters exist.',
		codeSnippetLines: hashkeySnippet,
		liveUrl: 'https://hashkey.capital/',
		closingTitle: 'Open the live site',
		closingDesc:
			'Home narrative, research & news, portfolio highlights, businesses, and group links as published on hashkey.capital.',
		closingSingleCta: {
			label: 'VISIT_HASHKEY_CAPITAL',
			href: 'https://hashkey.capital/',
		},
	},
	{
		slug: 'hku-alumni-giving',
		title: 'HKU_ALUMNI_GIVING',
		description:
			'The University of Hong Kong — alumnigiving.hku.hk donate experience: alumni & friends fundraising with designated faculties, departments, and initiatives; payment integration for secure checkout aligned with tax-receipt and compliance messaging.',
		status: 'LIVE',
		tags: ['LARAVEL', 'PAYMENTS'],
		filterTags: ['LARAVEL', 'PAYMENTS'],
		icon: 'payments',
		number: '03',
		impressionWeight: 96,
		caseStudyId: 'HKU06',
		heroTitleLine1: 'HKU ALUMNI',
		heroTitleSheen: 'GIVING',
		heroDesc:
			'Public donate journey for HKU Alumni Giving: storytelling and impact sections (scholarships, faculty funds, initiatives such as Pay it Forward and SmilesForAll), “Designate Your Support” routing across faculties and university units, and integrated payment flows so gifts land on the correct fund with a trustworthy, receipt-ready experience.',
		challenge:
			'The live site asks donors to choose among many valid destinations — faculties (e.g. Arts, Engineering, Law, HKUMed), departments (libraries, sports, museum), and cross-university funds — while surfacing tax-exemption copy (Section 88), overseas donor guidance, and electronic receipt policy. Checkout has to carry designation reliably through the gateway, stay resilient under campaign traffic, and stay consistent with the University’s compliance and receipt expectations.',
		solution1:
			'Server-side validation and persistence of amount, designation codes, and donor context before hand-off to the payment provider; idempotent session creation and clear success / failure handling so ops can reconcile gifts to the right ledger lines.',
		solution2:
			'Integration patterns that keep marketing and editorial content on the donate funnel independent from payment mechanics — CTA and “Donate Now” paths resolve to a stable checkout while metadata (fund / initiative identifiers) is preserved for reporting and receipt workflows, aligned with the live experience at alumnigiving.hku.hk.',
		deployedVersion: 'PROD',
		uptime: '99.9%',
		latency: 'Regional / CDN',
		stack: [
			'Laravel',
			'PHP',
			'Payment gateway integration',
			'Designated fund routing',
			'Donor & receipt workflows',
			'MySQL',
		],
		architectureQuote:
			'Institutional giving is part payments engineering, part trust — designation metadata has to survive the gateway the same way the donor’s intent survives the story on the page.',
		schematicImage: imgHkuAlumni,
		codeFileLabel: 'DONATIONCHECKOUT.PHP',
		codeSnippetExplanation:
			'Donations need both financial correctness and reconciliation: amounts are wrapped in a `Money` value object (HKD → minor units) so validation and gateway payloads stay consistent. `designation_code` is constrained with `Rule::in($funds->activeCodes())` so only real, currently active funds can be charged. A `correlation_id` (client-supplied UUID or freshly generated) backs `DonationIntent::updateOrCreate`, making the “create checkout session” step idempotent for refresh and double-submit scenarios while preserving fund metadata for receipts and reporting.',
		codeSnippetLines: hkuDonationSnippet,
		liveUrl: 'https://alumnigiving.hku.hk/donate/',
		closingTitle: 'Open the donate experience',
		closingDesc:
			'Impact narrative, designation of support across faculties and initiatives, and the live donation entry point as published by HKU Alumni Giving.',
		closingSingleCta: {
			label: 'VISIT_HKU_ALUMNI_GIVING',
			href: 'https://alumnigiving.hku.hk/donate/',
		},
	},
	{
		slug: 'anfield-international-school',
		title: 'ANFIELD_INTERNATIONAL',
		description:
			'Anfield International School — anfield.edu.hk: multi-campus kindergarten and primary group in Hong Kong; trilingual public site (EN / 简体 / 繁體), fees and admissions journeys; payment integration for school fee flows.',
		status: 'LIVE',
		tags: ['LARAVEL', 'PAYMENTS'],
		filterTags: ['LARAVEL', 'PAYMENTS', 'EDUCATION'],
		icon: 'school',
		number: '07',
		impressionWeight: 82,
		caseStudyId: 'ANF07',
		heroTitleLine1: 'ANFIELD',
		heroTitleSheen: 'INTERNATIONAL',
		heroDesc:
			'Family-facing digital presence for Anfield across Whampoa, Kowloon Tong, Tai Wai, and SBKY campuses: Catholic international education positioning, campus-specific fees and admissions, tours and enquiries, and integrated payment paths so fee-related transactions carry the right campus and billing context.',
		challenge:
			'A school group runs parallel brands per campus (kindergarten vs primary, inclusive education at SBKY) with different fee schedules and administrative contacts. Parents expect clear, trustworthy payment hand-offs in line with published fees and policies, while finance and ops need reconcilable references (campus, student or invoice identifiers) flowing through the gateway and back into internal records — without weakening the trilingual marketing and trust layer on the public site.',
		solution1:
			'Server-validated checkout initiation: amount, campus code, and invoice or statement references are confirmed before redirecting to the payment provider; webhooks or return URLs update payment status idempotently so double posts and race conditions do not duplicate ledger entries.',
		solution2:
			'Separation of editorial and marketing surfaces from payment mechanics — CTAs from fees and family-facing pages resolve to stable payment entry points while metadata (campus, billing reference) is preserved for reconciliation, aligned with production journeys on anfield.edu.hk and multi-campus fee documentation.',
		deployedVersion: 'PROD',
		uptime: '99.9%',
		latency: 'Regional / CDN',
		stack: [
			'Laravel',
			'PHP',
			'Payment gateway integration',
			'Fee & billing metadata',
			'Webhooks & reconciliation',
			'MySQL',
			'i18n (TC / SC / EN)',
		],
		architectureQuote:
			'School payments are trust and operations in one flow — the gateway has to echo campus and invoice reality the same way the fees page does for parents.',
		schematicImage: imgAnfield,
		codeFileLabel: 'FEECHECKOUT.PHP',
		codeSnippetExplanation:
			'School fee payments tie money to operations: `CampusRegistry::isBillable` rejects unknown campus codes before any intent is created. The invoice reference is validated and then hashed into `invoice_fingerprint` so you can detect replays without storing raw references in logs. `FeePaymentIntent` records `awaiting_hosted_session` state and passes `intent_id`, campus, and invoice into gateway metadata—exactly what finance webhooks need to match settlements back to the correct campus ledger line.',
		codeSnippetLines: anfieldFeeSnippet,
		liveUrl: 'https://anfield.edu.hk/',
		closingTitle: 'Open the live school site',
		closingDesc:
			'Campus overviews, trilingual navigation, fees and admissions context, and family-facing content as published at anfield.edu.hk — including the payment experience integrated for school fee workflows.',
		closingSingleCta: {
			label: 'VISIT_ANFIELD',
			href: 'https://anfield.edu.hk/',
		},
	},
	{
		slug: 'nanda-travel',
		title: 'NANDA_TRAVEL',
		description:
			'Nanda Travel (G C NANDA & SONS LTD), Hong Kong — UAT marketing site: tailor-made tours, global destinations and holiday ideas, offers, trilingual EN / 繁 / 简, enquiries, newsletter promos, and testimonials.',
		status: 'UAT',
		tags: ['CMS', 'TRAVEL'],
		filterTags: ['CMS'],
		icon: 'travel_explore',
		number: '08',
		impressionWeight: 55,
		caseStudyId: 'ND08',
		heroTitleLine1: 'NANDA',
		heroTitleSheen: 'TRAVEL',
		heroDesc:
			'Luxury tailor-made travel brand experience: hero narratives (“Unforgettable tailor-made tours”), deep destination and holiday-idea discovery (Africa through South Asia, cruises, safaris, rail), rotating offers, “Why travel with Nanda?” trust pillars (70+ years expertise), client testimonials, and clear enquiry / newsletter paths — in English, Traditional Chinese, and Simplified Chinese.',
		challenge:
			'The catalogue spans dozens of regions and curated holiday themes (cultural immersion, adventure, cruises, private journeys, wellness, expeditions) while staying browsable on mobile. Content must switch cleanly across three locales; marketing needs to run promos, capture leads (enquire now, newsletter with discount messaging), and surface social proof without cluttering the luxury positioning or compliance touchpoints (cookies, terms, privacy).',
		solution1:
			'Hierarchical IA separating mega-menus for destinations vs holiday ideas, with repeatable card and carousel patterns for offers and inspiration so editors can refresh campaigns without breaking layout or navigation depth.',
		solution2:
			'Lead flows with explicit success / error feedback, footer utilities (airfares, quick links, HK contact and WhatsApp), and newsletter subscription modals aligned with promo copy — keeping editorial content decoupled from form handling and third-party touchpoints.',
		deployedVersion: 'UAT',
		uptime: 'Staging',
		latency: 'As deployed',
		stack: [
			'CMS & editorial structure',
			'Multilingual (EN / 繁 / 简)',
			'Destination & holiday IA',
			'Offers & promo modules',
			'Enquiry & newsletter capture',
			'WhatsApp & footer integrations',
		],
		architectureQuote:
			'A travel brand site is part catalogue, part conversion — three languages and deep menus only work if enquiry and trust content stay as clear as the hero promise.',
		schematicImage: imgNanda,
		codeFileLabel: 'TRAVELENQUIRYCONTROLLER.PHP',
		codeSnippetExplanation:
			'Travel leads combine CRM hand-off and marketing consent: validation lives in `TravelEnquiryRequest` (where rate limits, honeypot fields, and locale-aware rules typically live). The enquiry row stores `locale` and a hashed user-agent fingerprint for abuse analysis without keeping full PII in every log line. `PushLeadToCrm::dispatch(...)->afterCommit()` mirrors the health/booking pattern; the optional `subscribe_offers` branch calls a dedicated newsletter service with an explicit `source` tag (`modal_promo`) so compliance and unsubscribe flows stay auditable separate from the core enquiry record.',
		codeSnippetLines: nandaSnippet,
		liveUrl: 'https://nanda-uat.visibleone.pro/',
		closingTitle: 'Open the UAT experience',
		closingDesc:
			'Destinations, holiday ideas, offers, and lead capture as staged on the Visible One UAT environment — representative of the Nanda Travel public journey before production cutover.',
		closingSingleCta: {
			label: 'VISIT_NANDA_UAT',
			href: 'https://nanda-uat.visibleone.pro/',
		},
	},
	{
		slug: 'influencer-ops-hub',
		title: 'INFLUENCER_OPS_HUB',
		description:
			'Internal Laravel 12 operations platform — influencer CRM (social accounts, VIP/bookmark, PIC ownership), campaigns with hierarchical tasks, deals with activity logs and DomPDF contracts, lens inventory & loan requests, meetings, purchase orders, leave requests; Spatie permissions, Sanctum, SQLite dev schema, database queues (`contracts`, `emails`).',
		status: 'INTERNAL',
		tags: ['LARAVEL', 'QUEUES'],
		filterTags: ['LARAVEL'],
		icon: 'hub',
		number: '09',
		impressionWeight: 45,
		caseStudyId: 'IOH09',
		heroTitleLine1: 'INFLUENCER',
		heroTitleSheen: 'OPS HUB',
		heroDesc:
			'End-to-end back-office product for influencer marketing and production ops: roster and platform metrics, deal negotiation through contract PDFs and tokenized client access, equipment lifecycle and influencer-linked lens requests, campaign task trees, procurement orders, scheduling, and HR leave — all under role-based access, bookmarking, and audit-friendly “last modified by” patterns.',
		challenge:
			'The domain packs many subsystems (people, inventory, legal documents, campaigns, procurement, calendar, leave) that each need rich relational models, seeds for local QA, and long-running work (PDF + mail) without blocking HTTP. Teams expect PIC assignment, bookmarks, remark threads, and status histories comparable to a small ERP — without sacrificing Laravel conventions or deployability on modest hosting.',
		solution1:
			'Modular boundaries per domain (User, Influencer, Lens, Deal, Campaign, Meeting, Order, Leave, LensRequest) with dedicated Artisan seeders and service classes — e.g. `DealService`, `Deal\\PdfService`, `Deal\\StatusService` — so orchestration, PDF generation, and activity logging stay testable and composable.',
		solution2:
			'Database-backed queues with split pipelines: `GenerateContractJob` on `contracts` with retries/backoff and timeouts, email jobs on `emails`, plus scheduled expiration checks — decoupling DomPDF and SMTP from web requests and matching the README’s production cron / worker guidance.',
		deployedVersion: 'PRIVATE',
		uptime: 'N/A',
		latency: 'Queue-driven',
		stack: [
			'Laravel 12',
			'PHP 8.2+',
			'Vite',
			'SQLite (dev)',
			'Laravel Sanctum',
			'Spatie Permission',
			'DomPDF',
			'Database queues',
		],
		architectureQuote:
			'When contracts and campaigns share the same app, queues and audit logs are as important as the CRUD screens — the HTTP thread should finish fast while PDFs and mail catch up honestly.',
		schematicImage: imgInfluencerOpsHub,
		codeFileLabel: 'GENERATECONTRACTJOB.PHP',
		codeSnippetExplanation:
			'This job is the async half of the deal module’s contract flow: load the deal graph once, render via `PdfService` to disk (DomPDF under the hood), persist `contract_url` and a fresh `access_token` for secure sharing, then hand off to `SendContractEmailJob` on the `emails` queue. High `$timeout` and `$tries` match long PDF runs and flaky mailers; keeping render + notify in separate jobs isolates failures so you can retry email without regenerating bytes.',
		codeSnippetLines: influencerOpsSnippet,
		closingTitle: 'Internal codebase',
		closingDesc:
			'Repository and runtime are private; behaviour and module layout follow the authoritative README in the product repo (users & Spatie roles, influencer/lens/deal/campaign/order/lens-request/meeting/leave modules, unified `workspace:seed` / `db:seed`, and `composer run dev` for serve + queue + Vite + `pail`).',
		closingSingleCta: {
			label: 'TALK_ABOUT_A_SIMILAR_BUILD',
			href: '/contact',
		},
	},
	{
		slug: 'keystone-edu-platform',
		title: 'KEYSTONE_EDU',
		description:
			'Internal Laravel 12 marketplace — Keystone : educational course booking for vendors and customers, English + Traditional Chinese content, Spatie roles (Admin, Vendor, Customer), Sanctum APIs, wishlists, timeslots and seat control, orders and payments, coupons and discounts, reviews, multilingual blog and SEO, popups, analytics with activity and click tracking, Slack alerts; Tailwind, Vite, Axios, repository and service layers, PHPUnit, Pint, Pail, Postman collection.json, Laravel Sail.',
		status: 'INTERNAL',
		tags: ['LARAVEL', 'BOOKING'],
		filterTags: ['LARAVEL', 'EDUCATION'],
		icon: 'school',
		number: '10',
		impressionWeight: 42,
		caseStudyId: 'KEY10',
		heroTitleLine1: 'KEYSTONE',
		heroTitleSheen: 'EDU PLATFORM',
		heroDesc:
			'Full-stack course commerce: vendors publish multilingual courses with media, locations, grouped timeslots, and discounts; customers discover, wishlist, book seats, pay, and review; admins moderate vendors, content, orders, and see dashboards — exposed through REST APIs, secured by Sanctum, and instrumented for operations (queues, logging, Slack).',
		challenge:
			'Marketplaces mix public SEO surfaces, authenticated vendor back-offices, and payment-sensitive checkout while enforcing seat capacity and promotional rules. Traditional Chinese and English must stay aligned across courses, blog, and meta; concurrent bookings cannot oversell a timeslot; and compliance-friendly audit trails (activity logging, session tracking) have to coexist with fast iteration via `composer run dev` (serve, queue, Pail, Vite).',
		solution1:
			'Layered architecture from the README: repository abstractions for data access, dedicated services for booking and discounts, Spatie permissions for the three-tier role model, and API-first routes with `collection.json` / `auth_collection.json` for consistent client integration (Axios) and QA.',
		solution2:
			'Operational hardening with database queues and cache/session drivers, file storage with S3-ready config, multilingual fields at the schema level (`*_en` / `*_tc`), and optional Sail for reproducible environments — matching the documented install path (`migrate`, `db:seed`, `storage:link`, `npm run dev`).',
		deployedVersion: 'PRIVATE',
		uptime: 'N/A',
		latency: 'API + queue',
		stack: [
			'Laravel 12',
			'PHP 8.2+',
			'Laravel Sanctum',
			'Spatie Permission',
			'SQLite / MySQL / PostgreSQL',
			'Tailwind CSS',
			'Vite',
			'Axios',
			'Database queues',
			'PHPUnit / Pint / Pail',
			'Slack notifications',
		],
		architectureQuote:
			'Education marketplaces are inventory problems dressed as content — seat locks and bilingual rows have to stay as honest as the checkout UX.',
		schematicImage: imgKeystoneEdu,
		codeFileLabel: 'COURSEBOOKINGCONTROLLER.PHP',
		codeSnippetExplanation:
			'This controller fragment is the concurrency-sensitive core of Keystone-style booking: validate against a real timeslot row, `lockForUpdate()` so two checkouts cannot grab the last seat, reject full sessions with 422, then create the customer order through a domain helper and run coupon logic inside the same transaction. Decrementing `seats_remaining` only after order creation keeps accounting aligned; returning the order with `items` and `payments` matches API consumers that immediately drive a payment gateway or confirmation screen.',
		codeSnippetLines: keystoneSnippet,
		closingTitle: 'Internal codebase',
		closingDesc:
			'Source lives in the private `vo_keystone` tree documented by the project README: role matrix (admin vendor management, vendor course/discount/timeslot tools, customer booking and reviews), REST surface area, multilingual SEO fields, and `composer run dev` for parallel server, queue worker, Pail, and Vite.',
		closingSingleCta: {
			label: 'TALK_ABOUT_A_SIMILAR_BUILD',
			href: '/contact',
		},
	},
	{
		slug: 'xbird-marketplace',
		title: 'X_BIRD',
		description:
			'Internal Laravel 12 multi-vendor marketplace — vo_xbirds: shops and vendors, blog, coupons (Excel import/export), onboarding (web + API), click tracking and analytics, Slack alerts; Sanctum, Spatie permissions, EN + Traditional Chinese; prebuilt admin assets and Tailwind via CDN (no Vite pipeline). Visual CMS is covered as a separate private case study package (Zenobuilder).',
		status: 'INTERNAL',
		tags: ['LARAVEL', 'ECOMMERCE'],
		filterTags: ['LARAVEL', 'ECOMMERCE'],
		icon: 'storefront',
		number: '11',
		impressionWeight: 40,
		caseStudyId: 'XB11',
		heroTitleLine1: 'X BIRD',
		heroTitleSheen: 'MARKETPLACE',
		heroDesc:
			'Full platform connecting vendors and customers: multilingual shop and category management, marketing popups and invite banners, repository- and service-layer admin code, REST APIs documented for Postman, and operational tooling (queues, session tracking, activity logs, system health). Editorial pages integrate a Zenobuilder-backed CMS documented under its own private case study entry.',
		challenge:
			'Operators need one admin surface for content, commerce-adjacent flows (courses, timeslots, coupons, reviews), and compliance-friendly audit data — while public pages stay SEO-aware in two languages and long-running work stays off the request thread.',
		solution1:
			'Layered admin architecture from the product README: repositories under `app/Repositories/Admin/`, services for Slack, click tracking, login sessions, and business rules; Spatie roles for super-admin, editor-admin, and staff-admin with granular permissions.',
		solution2:
			'Sanctum-secured onboarding and profile APIs, static frontend delivery from `public/` (Tailwind CDN, prebuilt JS), and a dedicated private case study package for the Zenobuilder visual CMS (`/admin/cms/pages`, templates, scheduled publish) — see `/projects/zenobuilder-cms-package`.',
		deployedVersion: 'PRIVATE',
		uptime: 'N/A',
		latency: 'API + queues',
		stack: [
			'Laravel 12',
			'PHP 8.2+',
			'Laravel Sanctum',
			'Spatie Permission',
			'SQLite / MySQL / PostgreSQL',
			'Tailwind (CDN) + static assets',
			'Database queues',
			'Slack notifications',
		],
		architectureQuote:
			'Marketplace ops need a hard admin boundary before any vendor or CMS screen — auth and role gates are the contract the rest of the panel inherits.',
		schematicImage: imgXbirdMarketplace,
		codeFileLabel: 'ROUTES/ADMIN.PHP',
		codeSnippetExplanation:
			'The README’s admin area is wrapped in `custom.auth` plus a Spatie-aware `role:` middleware that allows super-admin, editor-admin, and staff-admin. Prefixing everything under `admin` keeps public routes separate and makes it obvious which stack (session + permissions) applies before controllers, repositories, or Zenobuilder-backed CMS routes run.',
		codeSnippetLines: xbirdSnippet,
		closingTitle: 'Internal codebase',
		closingDesc:
			'Stack, routes, and caveats are documented in README.md at the portfolio workspace root (clone path `vo_xbirds`): 58 migrations, `db:seed`, `composer run dev` for server + queue + Pail, Postman `collection.json` / `auth_collection.json`, and known gaps such as missing `user_vendors` migrations. Zenobuilder CMS narrative: `/projects/zenobuilder-cms-package`.',
		closingSingleCta: {
			label: 'TALK_ABOUT_A_SIMILAR_BUILD',
			href: '/contact',
		},
	},
	{
		slug: 'zenobuilder-cms-package',
		title: 'ZENO_CMS_PACKAGE',
		description:
			'Private case study package — Zenobuilder-backed visual CMS integrated with Laravel admin: `/admin/cms/pages`, templates and template blocks, drag-and-drop builder assets under `public/assets/zenobuilder/`, scheduled publishing (`cms:publish-scheduled` every minute), multilingual page fields (EN + Traditional Chinese). Not a public product or OSS drop; engagement and deeper artifacts are available under NDA / bespoke scope.',
		status: 'INTERNAL',
		tags: ['CMS', 'LARAVEL'],
		filterTags: ['CMS', 'LARAVEL'],
		icon: 'dashboard_customize',
		number: '12',
		impressionWeight: 38,
		caseStudyId: 'ZB12',
		heroTitleLine1: 'ZENO',
		heroTitleSheen: 'CMS PACKAGE',
		heroDesc:
			'Private case study package documenting how a Zenobuilder-style visual page builder sits inside a Laravel 12 admin: pages and templates persisted in `cms_pages` / `cms_templates` (and block tables), editor-admin workflows, and time-based go-live without blocking HTTP requests.',
		challenge:
			'Marketing and editorial teams need WYSIWYG-grade layout control while engineering keeps schema migrations, permissions, and deploys predictable. Scheduled posts must flip at the right minute; preview and production paths must stay separated; builder static assets must version cleanly alongside the rest of `public/`.',
		solution1:
			'Admin routes and controllers for CMS pages and templates (as in the X Bird / `vo_xbirds` README), with Zenobuilder front-end loaded from vendored `public/assets/zenobuilder/` and Tailwind available via CDN for surrounding admin chrome.',
		solution2:
			'`cms:publish-scheduled` registered on a one-minute cadence in `routes/console.php`, aligned with production cron `* * * * * php artisan schedule:run`, so draft → published transitions are deterministic and observable outside the browser.',
		deployedVersion: 'PRIVATE',
		uptime: 'N/A',
		latency: 'Scheduler + DB',
		stack: [
			'Zenobuilder (vendored assets)',
			'Laravel 12 admin integration',
			'CMS pages & templates',
			'Scheduled publishing',
			'Multilingual content (EN / TC)',
			'Spatie-gated admin roles',
		],
		architectureQuote:
			'A visual CMS is only production-safe when publish timing lives in the scheduler — the builder edits rows; the clock promotes them.',
		schematicImage: imgZenobuilderCmsPackage,
		codeFileLabel: 'ROUTES/CONSOLE.PHP',
		codeSnippetExplanation:
			'The README wires `cms:publish-scheduled` to `everyMinute()` so any row the builder marked for a future `publish_at` (or equivalent) is picked up by a long-running cron-driven schedule, not by a visitor request. That separation keeps admin UX responsive and avoids race conditions when multiple editors save near a go-live boundary.',
		codeSnippetLines: zenobuilderCmsSnippet,
		closingTitle: 'Private case study package',
		closingDesc:
			'This entry is the portfolio-facing wrapper for the Zenobuilder-backed CMS slice of the internal `vo_xbirds` platform (see README.md). Artifacts, screen recordings, and schema notes are shared only as a private case study package for qualified conversations — not redistributed as a standalone product.',
		closingSingleCta: {
			label: 'REQUEST_PACKAGE_DETAILS',
			href: '/contact',
		},
	},
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
	return projects.find((p) => p.slug === slug);
}
